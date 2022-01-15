import {ethers} from 'ethers'
import {useEffect,useState} from 'react';
import axios from 'axios'
import Web3Modal from 'web3modal'


import { nftAddress,marketPlaceAddress } from '../config';
import nft from '../artifacts/contracts/NFT.sol/NFT.json'
import mp from '../artifacts/contracts/MarketPlace.sol/MarketPlace.json'

export default function UserDashboard() {
  const [nfts, setNFts] = useState([])
  const [sold, setSold] = useState([])
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
      
      const data = await marketContract.fetchItemsCreated();
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
          description : meta.data.description
        }
        return item
      }))
      const sold = items.filter(i=>i.sold)
      setSold(sold)
      setNFts(items)
      setLoadingState('loaded')
  }

  

  if(loadingState === 'loaded' && !nfts.length) return (<div  className='flex justify-center'>
    <img  src ='./minting.png' alt='t' height={500} width={500} /></div>)

  return (
    <div className='p-2'>
      <h2 className='px-20 py-7 text-4x2 text-white font-semibold'>Token Minted</h2>
    <div style={{maxWidth: '1400px'}}>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
      {
        nfts.map((nft, i)=>(
          <div key={i} className='border shadow rounded-x2 overflow-hidden'>
            <img src={nft.image}/>
           {console.log(nft.tokenId)}
            <div className='p-4'>
              <p style={{height:'14px'}} className='text-3x1 font-semibold text-white'>{
                nft.name}</p>
                
              </div>
              <div style={{height:'10px'}}>
                  <p className='text-gray-400 text-white'>{nft.description}</p>
              </div>
               <div className='p-4 bg-black'>
                  <p className='text-3x-1 mb-4 font-bold text-white'>{nft.price} ETH/HRS</p>
                  {/* <button className='w-full bg-purple-500 text-white font-bold py-3 px-12 rounded'
                  onClick={()=> buyNFT(nft)} >Buy
                  </button> */}
                </div> 
          </div>
        ))
      }
    </div>
    </div>
</div>

 
  
  )
}
