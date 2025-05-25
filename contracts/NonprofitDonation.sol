// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Nonprofit Donation Smart Contract
/// @notice Enables transparent, auditable donations for a nonprofit organization.
/// @dev All transactions are logged on-chain for public verification.

contract NonprofitDonation {
    address public owner;
    address public nonprofitWallet;

    event DonationReceived(address indexed donor, uint256 amount, string message, uint256 timestamp);
    event Withdrawal(address indexed to, uint256 amount, uint256 timestamp);

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
}
