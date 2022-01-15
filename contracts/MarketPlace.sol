//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//security against transactions for multiple requests
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import 'hardhat/console.sol';

//TODO
//[ ] Track Item Minting
//[ ] Track Number of Transactions
//[ ] Track unsold/available for sale Tokens
//[ ] Track tokens total number
//[ ] Determine owner of contract
//[ ] Platform fee

contract MarketPlace is ReentrancyGuard{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _tokensSold;

    address payable owner;

    uint listingPrice;

    constructor(){
        owner = payable(msg.sender);
        listingPrice = 0.045 ether;
    }
    
    struct MarketToken{
        uint itemId;
        address nftContract;
        uint tokenId;
        address seller;
        address owner;
        uint price;
        bool sold;
    }

    mapping(uint=>MarketToken) private idToMarketToken;

    event MarketTokenMinted(uint indexed itemId, address indexed nftContract,uint indexed tokenId,address seller, address owner, uint price, bool sold);

    function getListingPrice() public view returns(uint){
        return listingPrice;
    }

    //mint market token
    function createMarketOrder(address nftContract , uint tokenId, uint price) public payable nonReentrant {
        require(price >0 , "invalid price");
        require(msg.value==listingPrice, "Price must be equal to listing price");
        _tokenIds.increment();
        uint itemId = _tokenIds.current();
        idToMarketToken[itemId] = MarketToken(itemId,nftContract,tokenId,payable(msg.sender),payable(address(0)),price,false);
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        emit MarketTokenMinted(itemId, nftContract, tokenId, msg.sender, address(0), price, false);
    }

    //function to conduct transactions and market sales
    function sell(address nftContract,uint _itemId) payable public nonReentrant{
         address seller =idToMarketToken[_itemId].seller;
        require(msg.sender!=seller,'Your are already the owner');
        uint price =idToMarketToken[_itemId].price;
        uint tokenId = idToMarketToken[_itemId].tokenId;
        require(msg.value >= price , "invalid price"); 
        payable(idToMarketToken[_itemId].seller).transfer(msg.value);//transfer the amount
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketToken[_itemId].owner =payable(msg.sender);
        idToMarketToken[_itemId].sold = true;
        _tokensSold.increment();
        payable(owner).transfer(listingPrice);

    }

    //function fetch all the unsold tokens
    function fetchTokens() public view returns(MarketToken[] memory){
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() -_tokensSold.current(); //get the count of unsold item
        uint index = 0;
        MarketToken[] memory items = new MarketToken[](unsoldItemCount); //set the array of fixed size for unsold listing
        for(uint i; i<itemCount;i++){
            if(idToMarketToken[i+1].owner == address(0)){               
                items[index] = idToMarketToken[i+1];
                index++;
            }
        }
        return items;
    }


    //function to return Buyer nfts
    function fetchUserCollections() public view returns(MarketToken[] memory){
        uint totalItemCount = _tokenIds.current();
        uint itemPurchaseCount = 0;
        uint index =0;

        for(uint i;i<totalItemCount;i++){
            if(idToMarketToken[i+1].owner==msg.sender){
                itemPurchaseCount++; //detemining the user purchase count
            }       
        }

        MarketToken[] memory items = new MarketToken[](itemPurchaseCount);//making array of fixed size using purchase count
        for(uint i;i<totalItemCount;i++){
            if(idToMarketToken[i+1].owner==msg.sender){
                items[index]= idToMarketToken[idToMarketToken[i+1].itemId];
                index++;
            }       
        }
        return items;
    }


    //fetch for returning seller minted nfts
    function fetchItemsCreated() public view returns(MarketToken[] memory){
        uint totalItemCount = _tokenIds.current();
        uint itemPurchaseCount = 0;
        uint index =0;

         for(uint i;i<totalItemCount;i++){
            if(idToMarketToken[i+1].seller==msg.sender){
                itemPurchaseCount++; //detemining the user purchase count
            }       
        }

        MarketToken[] memory items = new MarketToken[](itemPurchaseCount);//making array of fixed size using purchase count
        for(uint i;i<totalItemCount;i++){
            if(idToMarketToken[i+1].seller==msg.sender){
                items[index]= idToMarketToken[i+1];
                index++;
            }       
        }
        return items;
    }


}