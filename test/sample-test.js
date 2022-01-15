const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MarketPlace", function () {
  it("should mint and trade nft", async function () {
      const Market = await ethers.getContractFactory('MarketPlace')
      const market = await Market.deploy();
      await market.deployed();
      const mAddress = market.address

      const NFT = await ethers.getContractFactory('NFT')
      const nft = await NFT.deploy(mAddress);
      await nft.deployed();
      const nAddress = nft.address

      let listingPrice =await market.getListingPrice();
      
      const auctionPrice = ethers.utils.parseUnits('100','ether');

      await nft.mintToken('http-1')
      await nft.mintToken('http-2')
      
      await market.createMarketItem(nAddress,1,auctionPrice,{value:listingPrice.toString()})
      await market.createMarketItem(nAddress,2,auctionPrice,{value:listingPrice.toString()})

      const[_,buyerAddress] = await ethers.getSigners()
      await market.connect(buyerAddress).sale(nAddress,1,{value:auctionPrice})

      let items = await market.fetchMarketTokens()
      items = await Promise.all(items.map(async i =>{
        const tokenuri = await  nft.tokenURI(i.tokenId)
        let item = {
           price : i.price.toString(),
           tokenId : i.tokenId.toString(),
           seller : i.seller,
           owner : i.owner,
           tokenuri 

        }
        return item;
      }))
      console.log(items)
  });
});
