// SPDX-License-Identifier: MIT
<<<<<<< HEAD
pragma solidity ^0.8.20;

/// @title Nonprofit Donation Smart Contract
/// @notice Enables transparent, auditable donations for a nonprofit organization.
/// @dev All transactions are logged on-chain for public verification.

contract NonprofitDonation {
    address public owner;
=======
pragma solidity ^0.8.24;

import {Ownable2Step, Ownable} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Nonprofit Donation Smart Contract
/// @notice Records transparent donations and lets a Safe multisig owner withdraw to a nonprofit treasury.
/// @dev Production ownership should be transferred to a Safe multisig, not an individual wallet.
contract NonprofitDonation is Ownable2Step, Pausable, ReentrancyGuard {
>>>>>>> origin/codex/production-readiness-upgrade
    address public nonprofitWallet;

    event DonationReceived(address indexed donor, uint256 amount, string message, uint256 timestamp);
    event Withdrawal(address indexed to, uint256 amount, uint256 timestamp);
<<<<<<< HEAD

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _nonprofitWallet) {
        require(_nonprofitWallet != address(0), "Invalid wallet");
        owner = msg.sender;
        nonprofitWallet = _nonprofitWallet;
    }

    /// @notice Donate ETH to the nonprofit. All donations are logged.
    /// @param message Optional message from the donor.
    function donate(string calldata message) external payable {
        require(msg.value > 0, "Donation must be greater than zero");
        emit DonationReceived(msg.sender, msg.value, message, block.timestamp);
    }

    /// @notice Withdraw accumulated funds to the nonprofit's wallet.
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        (bool sent, ) = nonprofitWallet.call{value: balance}("");
        require(sent, "Withdrawal failed");
        emit Withdrawal(nonprofitWallet, balance, block.timestamp);
    }

    /// @notice Change the nonprofit's receiving wallet.
    /// @param newWallet The new wallet address.
    function setNonprofitWallet(address newWallet) external onlyOwner {
        require(newWallet != address(0), "Invalid address");
        nonprofitWallet = newWallet;
    }

    /// @notice Get the contract's ETH balance.
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
=======
    event NonprofitWalletUpdated(address indexed previousWallet, address indexed newWallet, uint256 timestamp);

    constructor(address initialNonprofitWallet) Ownable(msg.sender) {
        if (initialNonprofitWallet == address(0)) {
            revert("Invalid wallet");
        }

        nonprofitWallet = initialNonprofitWallet;
    }

    /// @notice Donate ETH to the nonprofit. All donations are logged.
    /// @param message Optional donor message.
    function donate(string calldata message) external payable whenNotPaused {
        if (msg.value == 0) {
            revert("Donation must be greater than zero");
        }

        emit DonationReceived(msg.sender, msg.value, message, block.timestamp);
    }

    /// @notice Withdraw the entire contract balance to the nonprofit treasury.
    function withdrawAll() external onlyOwner nonReentrant {
        _withdraw(address(this).balance);
    }

    /// @notice Withdraw part of the contract balance to the nonprofit treasury.
    /// @param amount Amount of wei to withdraw.
    function withdraw(uint256 amount) external onlyOwner nonReentrant {
        _withdraw(amount);
    }

    /// @notice Pause donations during an incident or maintenance window.
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Resume donations after pause.
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @notice Change the nonprofit receiving wallet.
    /// @dev Consider using a timelock or governance delay before production treasury changes.
    /// @param newWallet The new treasury wallet address.
    function setNonprofitWallet(address newWallet) external onlyOwner {
        if (newWallet == address(0)) {
            revert("Invalid address");
        }

        address previousWallet = nonprofitWallet;
        nonprofitWallet = newWallet;

        emit NonprofitWalletUpdated(previousWallet, newWallet, block.timestamp);
    }

    /// @notice Get the contract ETH balance.
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function _withdraw(uint256 amount) internal {
        if (amount == 0) {
            revert("No funds to withdraw");
        }

        if (amount > address(this).balance) {
            revert("Insufficient balance");
        }

        (bool sent, ) = nonprofitWallet.call{value: amount}("");
        if (!sent) {
            revert("Withdrawal failed");
        }

        emit Withdrawal(nonprofitWallet, amount, block.timestamp);
    }
>>>>>>> origin/codex/production-readiness-upgrade
}
