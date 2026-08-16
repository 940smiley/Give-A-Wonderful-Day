// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title GAWD Character NFT
/// @notice An NFT contract to represent characters created for suicide prevention grant recipients.
/// @dev Mints are restricted to the owner (the application backend).
contract GAWDCharacter is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    event CharacterMinted(address indexed to, uint256 indexed tokenId, string uri);

    constructor() ERC721("Give A Wonderful Day Character", "GAWD") Ownable(msg.sender) {}

    /// @notice Mints a new character NFT to a specific address.
    /// @param to The address receiving the NFT.
    /// @param uri The metadata URI for the NFT.
    function mintCharacter(address to, string calldata uri) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit CharacterMinted(to, tokenId, uri);
        
        return tokenId;
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
