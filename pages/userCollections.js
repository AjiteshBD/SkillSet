import {ethers} from 'ethers'
import {useEffect,useState} from 'react';
import axios from 'axios'
import Web3Modal from 'web3modal'


import { nftAddress,marketPlaceAddress } from '../config';
import nft from '../artifacts/contracts/NFT.sol/NFT.json'
import mp from '../artifacts/contracts/MarketPlace.sol/MarketPlace.json'

export default function UserCollections() {
  const [nfts, setNFts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

 

  useEffect(()=> {
    loadNFTS()
  }, [])

  async function loadNFTS(){
    //Provider,tokenContract, MarketPlaceContract, data for our marketItems
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      const tokenContract =  new ethers.Contract(nftAddress,nft.abi,signer);
      const marketContract = new ethers.Contract(marketPlaceAddress,mp.abi,signer);
      
      const data = await marketContract.fetchUserCollections();
      const items = await Promise.all(data.map(async i=>{

        const tokenuri = await  tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenuri);
        let price = ethers.utils.formatUnits(i.price.toString(),'ether');
        let item = {
          price,
          tokenId : i.tokenId.toNumber(),
          seller : i.seller,
          owner :i.owner,
          image : meta.data.image,
          name : meta.data.name,
          description : meta.data.description,
          link : meta.data.link
        }
        return item
      }))
      
      setNFts(items)
      setLoadingState('loaded')
  }

  

  if(loadingState === 'loaded' && !nfts.length) return (<div  className='flex justify-center'>
    <img  src ='./minting.png' alt='t' height={500} width={500} /></div>)

  return (
    <div className='flex justify-center'>
    <div style={{maxWidth: '1400px'}}>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
      {
        nfts.map((nft, i)=>(
          <div key={i} className='border shadow rounded-x1 overflow-hidden'>
            <img src={nft.image}/>
          
            <div className='p-4'>
              <p style={{height:'14px'}} className='text-3x1 font-semibold text-white'>{
                nft.name}</p>
                
              </div>
              <div style={{height:'40px'}}>
                  <p className='text-gray-400 text-white'>{nft.description!=null?nft.description:nft.skills}</p>

                  <p className='text-gray-400 text-white'>{nft.link!=null?"":nft.skillscore}</p>
              </div>
              <div className='p-4 bg-black'>
                  <p className='text-3x-1 mb-4 font-bold text-white'>{nft.price} ETH</p>
                  {nft.link!=null?
                  <a href={nft.link} target="_blank" rel="noreferrer">
                   <button className='w-full bg-purple-500 text-white font-bold py-3 px-12 rounded'
                   
                 >Get
                  </button></a> :<span></span>
                }
                </div>
          </div>
        ))
      }
    </div>
    </div>
</div>

 
  
  )
}
