import  { useEffect,useState } from 'react'
import Router from 'next/router'


export default function Test() {
    
    const [router, setRouter] = useState([]); 

  useEffect(()=> {
   
    setRouter(Router)
  }, [])

  return (
    <div className='flex justify-center'>
    <div style={{maxWidth: '1200px'}}>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-orange-500 drop-shadow-xl rounded-3xl'>
     
       
          <div  className='bg-zinc-700 border shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden px-1 py-1'>
            <div className='bg-zinc-800  shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden'>
            <img src="/nodejs.jpg" className='rounded-3xl'/>
            </div>
            <div className='p-4 bg-zinc-700'>
              <p style={{height:'14px'}} className='text-3x1 font-semibold text-white'>Nodejs </p>
                
              </div>
              <div style={{height:'10px'}} className='bg-zinc-700'>
                  <p className=' text-white bg-zinc-700'>Nodejs Skill test</p>
              </div>
              <div className='p-4 bg-zinc-700'>
             
                  <button className='w-full bg-indigo-500 text-white font-bold py-3 px-12 rounded  hover:bg-purple-600 hover:shadow-orange-300 drop-shadow-xl'
                onClick={()=>router.push({pathname:'/question',query:{test:'NODEJS',testId:1}})} >Take Test
                  </button>
                </div>
          </div>

          <div  className='bg-zinc-700 border shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden px-1 py-1'>
            <div className='bg-zinc-800  shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden'>
            <img src="/ethereum.png" className='rounded-3xl'/>
            </div>
            <div className='p-4 bg-zinc-700'>
              <p style={{height:'14px'}} className='text-3x1 font-semibold text-white'>Solidity </p>
                
              </div>
              <div style={{height:'10px'}} className='bg-zinc-700'>
                  <p className=' text-white bg-zinc-700'>Solidity Skill test</p>
              </div>
              <div className='p-4 bg-zinc-700'>
             
                  <button className='w-full bg-indigo-500 text-white font-bold py-3 px-12 rounded  hover:bg-purple-600 hover:shadow-orange-300 drop-shadow-xl'
                 onClick={()=>router.push({pathname:'/question',query:{test:'SOLIDITY',testId:2}})}>Take Test
                  </button>
                </div>
          </div>


          <div  className='bg-zinc-700 border shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden px-1 py-1'>
            <div className='bg-zinc-800  shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden'>
            <img src="/java.png" className='rounded-3xl'/>
            </div>
            <div className='p-4 bg-zinc-700'>
              <p style={{height:'14px'}} className='text-3x1 font-semibold text-white'>JAVA </p>
                
              </div>
              <div style={{height:'10px'}} className='bg-zinc-700'>
                  <p className=' text-white bg-zinc-700'>JAVA Skill test</p>
              </div>
              <div className='p-4 bg-zinc-700'>
             
                  <button className='w-full bg-indigo-500 text-white font-bold py-3 px-12 rounded  hover:bg-purple-600 hover:shadow-orange-300 drop-shadow-xl'
                   onClick={()=>router.push({pathname:'/question',query:{test:'JAVA',testId:3}})}>Take Test
                  </button>
                </div>
          </div>

          <div  className='bg-zinc-700 border shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden px-1 py-1'>
            <div className='bg-zinc-800  shadow-grey-300 drop-shadow-xl rounded-3xl overflow-hidden'>
            <img src="/js.png" className='rounded-3xl'/>
            </div>
            <div className='p-4 bg-zinc-700'>
              <p style={{height:'14px'}} className='text-3x1 font-semibold text-white'>Javascript </p>
                
              </div>
              <div style={{height:'10px'}} className='bg-zinc-700'>
                  <p className=' text-white bg-zinc-700'>Javascript Skill test</p>
              </div>
              <div className='p-4 bg-zinc-700'>
             
                  <button className='w-full bg-indigo-500 text-white font-bold py-3 px-12 rounded  hover:bg-purple-600 hover:shadow-orange-300 drop-shadow-xl'
                onClick={()=>router.push({pathname:'/question',query:{test:'JAVASCRIPT',testId:4}})}>Take Test
                  </button>
                </div>
          </div>
       
         
    
    </div>
    </div>
</div>

      // <footer className={styles.footer}>
      //   <a
      //     href="/"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Powered by{' '}
      //     <span className={styles.logo}>
      //       <Image src="/favicon.ico" alt="Logo" width={30} height={25} />
      //     </span>
      //   </a>
      // </footer>
  
  )
}
