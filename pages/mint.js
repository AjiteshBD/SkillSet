import {ethers} from 'ethers'
import {useState} from 'react';
import Web3Modal from 'web3modal'
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { nftAddress,marketPlaceAddress } from '../config';
import nft from '../artifacts/contracts/NFT.sol/NFT.json'
import mp from '../artifacts/contracts/MarketPlace.sol/MarketPlace.json'
import { NFTStorage } from 'nft.storage'
import { useRouter } from 'next/router';
import { createProjectMarket } from '../util/util';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

//Store Nft in IPFS
export default function (){
   const [fileURL,setFileURL] = useState(null);
   const [formInput, updateFormInput] = useState({price:'',name:'',description:'',type:'',status:'',link:''});
   const router = useRouter();

   async function  onChange(e){
        const image = e.target.files[0];
     
        try{
        const metadata = await client.add(
            image, {
                progress: (prog) => console.log(`received: ${prog}`)
            })
        const url = `https://ipfs.infura.io/ipfs/${metadata.path}`
        setFileURL(url)
        }catch(err){
            console.log(err)
        }
   }

   async function  createMarket(){
       const {name,description,price,type,status,link} =formInput;
       createProjectMarket(name,description,price,type,status,link,fileURL,router)
    //    if(!name||!price||!description||!fileURL) return
    //    //upload to IPFS
    //     const data = JSON.stringify({
    //         name,description,image:fileURL
    //     })
    //     try{
    //         const metadata = await  client.add(data)
    //         const url = `https://ipfs.infura.io/ipfs/${metadata.path}`
    //         // run a function that creates sale and passes in the url 
    //         createSaleURL(url)
    //         }catch(err){
    //             console.log(err)
    //         }
        
   }

//    async function  createSaleURL(url){
//        //create item in on blockchain
//         const web3Modal = new Web3Modal()
//         const connection = await web3Modal.connect();
//         const provider = new ethers.providers.Web3Provider(connection)
//         const signer = provider.getSigner()

//         //create a token
//         let contract = new ethers.Contract(nftAddress, nft.abi,signer)
//         let transaction = await contract.mintToken(url)
//         let tx = await transaction.wait()
//         let event = tx.events[0]
//         let value = event.args[2]
//         let tokenId = value.toNumber()
//         const price = ethers.utils.parseUnits(formInput.price,'ether')

//         //list on marketplace
//         contract = new ethers.Contract(marketPlaceAddress, mp.abi,signer)
//         let listingPrice = contract.getListingPrice();
//         //listingPrice = listingPrice.toString();
//         console.log(listingPrice)
//         transaction = await contract.createMarketOrder(nftAddress,tokenId,price,{value:listingPrice})
//         await transaction.wait()
//         router.push('./')
//    }

   return (
    <div className='flex justify-center'>
        <div className='w-1/2 flex flex-col pb-12'>
            <input
            placeholder='Project Name'
            className='mt-8 border rounded p-4'
            onChange={ e => updateFormInput({...formInput, name: e.target.value})} 
            />
            <textarea
            placeholder='Project Description'
            className='mt-2 border rounded p-4'
            onChange={ e => updateFormInput({...formInput, description: e.target.value})} 
            />
            <input
            placeholder='Project Price in Eth'
            className='mt-2 border rounded p-4'
            onChange={ e => updateFormInput({...formInput, price: e.target.value})} 
            />
            <input
            placeholder='Project type'
            className='mt-2 border rounded p-4'
            onChange={ e => updateFormInput({...formInput, type: e.target.value})} 
            /> 

            <input
            placeholder='Project status'
            className='mt-2 border rounded p-4'
            onChange={ e => updateFormInput({...formInput, status: e.target.value})} 
            /> 
            <input
            placeholder='Project file link unlock after sale'
            className='mt-2 border rounded p-4'
            onChange={ e => updateFormInput({...formInput, link: e.target.value})} 
            /> 
            <input
            type='file'
            name='Project image'
            className='mt-4 text-white'
            onChange={onChange} 
            /> {
            fileURL && (
                <img className='rounded mt-4' width='350px' src={fileURL} />
            )}
            
            <button onClick={createMarket}
            className='font-bold mt-4 bg-purple-500 text-white rounded p-4 shadow-lg'
            >
                Mint NFT
            </button>
        </div>
    </div>
)

}



