//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;//Counter allow us to keep track of tokenIds
    address contractAddress; 
    event TokenMinted(uint indexed Itemid);
    constructor(address marketplaceAddress) ERC721('Solo','SOLO'){
        contractAddress= marketplaceAddress;
    }
    
    function mintToken(string memory tokenURI)public returns(uint){
        _tokenIds.increment();
        uint itemId = _tokenIds.current();
        _mint(msg.sender,itemId);
        //Uri id and url of ipfs
        _setTokenURI(itemId,tokenURI);
        //give the marketplace approval to transact between users
        setApprovalForAll(contractAddress,true);
        emit TokenMinted(itemId);
        return itemId;
    }
    
}
