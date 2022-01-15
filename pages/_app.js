import '../styles/globals.css'
import '../styles/app.css'
import Head from "next/head";
import { getSignerAddress } from '../util/util';
import {useEffect,useState} from 'react';

function MyApp({ Component, pageProps }) {
  const [first, setFirst] = useState([]);
  const [last, setLast] = useState([]);


  useEffect(async()=> {
  let address = await getSignerAddress();
  setFirst(address.substring(0,7))
  setLast(address.substring(address.length,address.length-5))
  }, [])
  

  return (
    
    <div>
       <Head>
        <title>Skillset</title>
      </Head>
   <nav className="flex items-center justify-between flex-wrap  p-6" style={{backgroundColor:'black'}}>
  <div className="flex items-center flex-shrink-0 text-white mr-6">
    <img src='./logo.png' alt='logo' height={12} width={100}/>
  </div>
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow font-semibold">
      <a href="./" className="block mt-4 lg:inline-block lg:mt-0 text-[#8dfcca] hover:text-white mr-4">
        Talents
      </a>
      <a href="./projects" className="block mt-4 lg:inline-block lg:mt-0 text-[#8dfcca] hover:text-white mr-4">
       Projects
      </a>
      <a href="./mint" className="block mt-4 lg:inline-block lg:mt-0 text-[#8dfcca] hover:text-white mr-4">
        Mint Projects
      </a>
      <a href="./test" className="block mt-4 lg:inline-block lg:mt-0 text-[#8dfcca] hover:text-white mr-4">
        Take Test
      </a>
      <a href="./userCollections" className="block mt-4 lg:inline-block lg:mt-0 text-[#8dfcca] hover:text-white mr-4">
        Your Collections
      </a>
      {/* <a href="./team" className="block mt-4 lg:inline-block lg:mt-0 text-[#8dfcca] hover:text-white mr-4">
        Your Team
      </a> */}


      <a href="./dashboard" className="block mt-4 lg:inline-block lg:mt-0 text-[#8dfcca] hover:text-white">
        Profile
      </a>
    </div>
    <div>
   <img src='./coin.png' className='px-1' width={38} height={38} alt='icon'/>
    </div>
    
    <div>      
      <a className="inline-block text-sm px-4 py-2 bg-amber-600 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"><b>{first}...{last}</b></a>
    </div>
  </div>
  
</nav>
<Component {...pageProps} />
</div>
  )
}

export default MyApp
