import {ethers} from 'ethers'
import {useEffect,useState} from 'react';
import axios from 'axios'
import Web3Modal from 'web3modal'
import swal from 'sweetalert';

import { nftAddress,marketPlaceAddress } from '../config';
import nft from '../artifacts/contracts/NFT.sol/NFT.json'
import mp from '../artifacts/contracts/MarketPlace.sol/MarketPlace.json'
import { createFlow, getFlow, getRPCProvider } from '../util/util';
import { copyFileSync } from 'fs';

export default function Home() {
  const [nfts, setNFts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [hired, setHired] = useState(false)

  const [talent, setTalents] = useState([])

  useEffect(()=> {
    loadNFTS()
  }, [])

  async function loadNFTS(){
    //Provider,tokenContract, MarketPlaceContract, data for our marketItems
      const provider = await getRPCProvider()
      const tokenContract =  new ethers.Contract(nftAddress,nft.abi,provider);
      const marketContract = new ethers.Contract(marketPlaceAddress,mp.abi,provider);
    
      const data = await marketContract.fetchTokens();
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
          skills : meta.data.skills,
          score: meta.data.skillscore,
          testId : meta.data.testId
        }
        return item
      }))
      
      const talent = items.filter(i=>i.testId!=null)
     
      setTalents(talent)
      setNFts(items)
      setLoadingState('loaded')
  }

  async function hire(nft){
    
    await createFlow(nft.seller,nft.price,100000)   
    setHired(true) 
    loadNFTS()
  }

 

  if(loadingState === 'loaded' && !talent.length) return (<div  className='flex justify-center'>
    <img  src ='./minting.png' alt='t' height={500} width={500} /></div>)

  return (
    <div className='flex justify-center'>
    <div style={{maxWidth: '1600px'}}>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-8 border-orange-500 drop-shadow-xl rounded-3xl'>
      {
        talent.map((nft, i)=>(
        
          <div key={i} className='bg-zinc-700 border shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden px-1 py-1'>
            <div className='bg-zinc-800  shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden'>
            <img src={nft.image} className='rounded-3xl'/>
            </div>
            
            <div className='p-4 bg-zinc-700'>
              <p style={{height:'14px'}} className='text-3x1 font-semibold text-white'>{
                nft.name} SkillSet #{nft.tokenId}</p>
                
              </div>
              <div style={{height:'40px'}} className='bg-zinc-700'>
                  <p className=' text-white bg-zinc-700'>Skills:<b className='text-green-500'> {nft.skills}</b></p>
                  <p className=' text-white bg-zinc-700'>Score : <b className='text-yellow-500'>{nft.score}</b></p>
              </div>
              <div className='p-4 bg-zinc-700'>
                  <p className='text-3x-1 mb-4 font-bold text-white'>{nft.price} ETH/HRS</p>
                 {hired?<button className='w-full bg-teal-500 text-white font-bold py-3 px-12 rounded  hover:bg-purple-600 hover:shadow-orange-300 drop-shadow-xl'
                  onClick={()=> hire(nft)} >Hired!
                  </button>:
                   <button className='w-full bg-indigo-500 text-white font-bold py-3 px-12 rounded  hover:bg-purple-600 hover:shadow-orange-300 drop-shadow-xl'
                   onClick={()=> hire(nft)} >Hire
                   </button>}
                 
                </div>
          </div>
        ))
      }
    </div>
    </div>
</div>

     
  
  )
}
