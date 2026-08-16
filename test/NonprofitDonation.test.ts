import { expect } from 'chai';
import hre from 'hardhat';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs.js';
import type { BaseContract, ContractTransactionResponse } from 'ethers';

const { ethers } = hre;

type DonationContract = BaseContract & {
  owner(): Promise<string>;
  nonprofitWallet(): Promise<string>;
  donate(
    message: string,
    overrides?: { value: bigint | number },
  ): Promise<ContractTransactionResponse>;
  withdrawAll(): Promise<ContractTransactionResponse>;
  withdraw(amount: bigint): Promise<ContractTransactionResponse>;
  setNonprofitWallet(address: string): Promise<ContractTransactionResponse>;
  pause(): Promise<ContractTransactionResponse>;
  unpause(): Promise<ContractTransactionResponse>;
  transferOwnership(address: string): Promise<ContractTransactionResponse>;
  acceptOwnership(): Promise<ContractTransactionResponse>;
};

type ReentrantTreasuryContract = BaseContract & {
  acceptOwnership(): Promise<ContractTransactionResponse>;
  setAttackEnabled(enabled: boolean): Promise<ContractTransactionResponse>;
  attackWithdrawAll(): Promise<ContractTransactionResponse>;
  reentryAttempts(): Promise<bigint>;
  reentryFailures(): Promise<bigint>;
};

function asDonation(contract: BaseContract): DonationContract {
  return contract as unknown as DonationContract;
}

function asReentrantTreasury(contract: BaseContract): ReentrantTreasuryContract {
  return contract as unknown as ReentrantTreasuryContract;
}

describe('NonprofitDonation', function () {
  async function deployFixture() {
    const [owner, treasury, donor, other, newTreasury] = await ethers.getSigners();
    if (!owner || !treasury || !donor || !other || !newTreasury) {
      throw new Error('Hardhat signers are unavailable.');
    }
    const Donation = await ethers.getContractFactory('NonprofitDonation');
    const donation = asDonation(await Donation.deploy(treasury.address));
    await donation.waitForDeployment();

    return { donation, owner, treasury, donor, other, newTreasury };
  }

  it('constructor rejects a zero wallet', async function () {
    const Donation = await ethers.getContractFactory('NonprofitDonation');
    await expect(Donation.deploy(ethers.ZeroAddress)).to.be.revertedWith('Invalid wallet');
  });

  it('assigns the deployer as owner', async function () {
    const { donation, owner } = await deployFixture();
    expect(await donation.owner()).to.equal(owner.address);
  });

  it('rejects zero-value donations', async function () {
    const { donation, donor } = await deployFixture();
    await expect(asDonation(donation.connect(donor)).donate('hello')).to.be.revertedWith(
      'Donation must be greater than zero',
    );
  });

  it('accepts valid donations and emits transparent event fields', async function () {
    const { donation, donor } = await deployFixture();
    const amount = ethers.parseEther('1');

    await expect(asDonation(donation.connect(donor)).donate('for joy', { value: amount }))
      .to.emit(donation, 'DonationReceived')
      .withArgs(donor.address, amount, 'for joy', anyValue);

    expect(await ethers.provider.getBalance(await donation.getAddress())).to.equal(amount);
  });

  it('blocks unauthorized withdrawals', async function () {
    const { donation, other } = await deployFixture();
    await expect(asDonation(donation.connect(other)).withdrawAll())
      .to.be.revertedWithCustomError(donation, 'OwnableUnauthorizedAccount')
      .withArgs(other.address);
  });

  it('rejects zero-balance withdrawals', async function () {
    const { donation } = await deployFixture();
    await expect(donation.withdrawAll()).to.be.revertedWith('No funds to withdraw');
  });

  it('withdraws all funds to the treasury', async function () {
    const { donation, treasury, donor } = await deployFixture();
    const amount = ethers.parseEther('0.5');
    await asDonation(donation.connect(donor)).donate('', { value: amount });

    await expect(donation.withdrawAll())
      .to.emit(donation, 'Withdrawal')
      .withArgs(treasury.address, amount, anyValue);
    expect(await ethers.provider.getBalance(await donation.getAddress())).to.equal(0);
  });

  it('supports partial withdrawals', async function () {
    const { donation, treasury, donor } = await deployFixture();
    const amount = ethers.parseEther('1');
    const partial = ethers.parseEther('0.4');
    await asDonation(donation.connect(donor)).donate('', { value: amount });

    await expect(donation.withdraw(partial)).to.changeEtherBalance(treasury, partial);
    expect(await ethers.provider.getBalance(await donation.getAddress())).to.equal(
      amount - partial,
    );
  });

  it('updates the treasury wallet and emits an event', async function () {
    const { donation, treasury, newTreasury } = await deployFixture();

    await expect(donation.setNonprofitWallet(newTreasury.address))
      .to.emit(donation, 'NonprofitWalletUpdated')
      .withArgs(treasury.address, newTreasury.address, anyValue);

    expect(await donation.nonprofitWallet()).to.equal(newTreasury.address);
  });

  it('rejects a zero treasury wallet', async function () {
    const { donation } = await deployFixture();
    await expect(donation.setNonprofitWallet(ethers.ZeroAddress)).to.be.revertedWith(
      'Invalid address',
    );
  });

  it('pause blocks donations and unpause restores donations', async function () {
    const { donation, donor } = await deployFixture();
    await donation.pause();
    await expect(
      asDonation(donation.connect(donor)).donate('', { value: 1 }),
    ).to.be.revertedWithCustomError(donation, 'EnforcedPause');

    await donation.unpause();
    await expect(asDonation(donation.connect(donor)).donate('', { value: 1 })).to.emit(
      donation,
      'DonationReceived',
    );
  });

  it('ownership transfer requires acceptance', async function () {
    const { donation, other } = await deployFixture();

    await donation.transferOwnership(other.address);
    await expect(asDonation(donation.connect(other)).pause())
      .to.be.revertedWithCustomError(donation, 'OwnableUnauthorizedAccount')
      .withArgs(other.address);

    await asDonation(donation.connect(other)).acceptOwnership();
    expect(await donation.owner()).to.equal(other.address);
    await expect(asDonation(donation.connect(other)).pause()).to.emit(donation, 'Paused');
  });

  it('prevents a reentrant withdrawal attempt', async function () {
    const { donation, donor } = await deployFixture();
    const ReentrantTreasury = await ethers.getContractFactory('ReentrantTreasury');
    const treasury = asReentrantTreasury(
      await ReentrantTreasury.deploy(await donation.getAddress()),
    );
    await treasury.waitForDeployment();

    await donation.setNonprofitWallet(await treasury.getAddress());
    await donation.transferOwnership(await treasury.getAddress());
    await treasury.acceptOwnership();
    await asDonation(donation.connect(donor)).donate('', { value: ethers.parseEther('1') });
    await treasury.setAttackEnabled(true);

    await treasury.attackWithdrawAll();

    expect(await treasury.reentryAttempts()).to.equal(1);
    expect(await treasury.reentryFailures()).to.equal(1);
    expect(await ethers.provider.getBalance(await donation.getAddress())).to.equal(0);
  });
});
