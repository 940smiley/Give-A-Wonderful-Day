import hre from 'hardhat';

const { ethers } = hre;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required.`);
  }
  return value;
}

async function main() {
  const treasury = requireEnv('TREASURY_ADDRESS');
  const Donation = await ethers.getContractFactory('NonprofitDonation');
  const donation = await Donation.deploy(treasury);
  await donation.waitForDeployment();

  console.log(`NonprofitDonation deployed to ${await donation.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
