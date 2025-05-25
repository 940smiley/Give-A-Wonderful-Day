// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/// @title ThankYouNFT
/// @notice Mints a unique NFT as a thank you to donors.
contract ThankYouNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    address public donationContract;

    event NFTMinted(address indexed to, uint256 tokenId, string message);

    modifier onlyDonationContract() {
        require(msg.sender == donationContract, "Not authorized");
        _;
    }

    constructor(address _donationContract) ERC721("ThankYouNFT", "TYNFT") {
        require(_donationContract != address(0), "Invalid contract");
        donationContract = _donationContract;
    }

    function mintNFT(address to, string calldata message) external onlyDonationContract returns (uint256) {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        emit NFTMinted(to, tokenId, message);
        return tokenId;
    }

    function setDonationContract(address _donationContract) external onlyOwner {
        require(_donationContract != address(0), "Invalid contract");
        donationContract = _donationContract;
    }
}
