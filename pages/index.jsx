import axios from 'axios'
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from 'react'
import Btn from './comps/Customstyles';



const index = () => {

  const { data: session } = useSession();


 
  return (
    
    <div className='p-2 m-2'>
      <div className='flex justify-center'>
      {session
        ?
          <div className='text-center flex justify-center text-purple-600 dark:text-sky-500 text-4xl'>
            <h1>Welcome, {session?.user.name}</h1>
          </div>
      
      
       : 

        <div className='border-2 rounded-xl p-2 glass
         flex justify-center flex-col text-center text-purple-600 dark:text-sky-500'>
        <h1 className='text-5xl'>Login to view this page</h1>
        <Btn btnName={'Login'} goTo={'/login'}/>
      
        </div>

        }
      </div>
 
    </div>
  )
}

export default index