import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { getSession } from "next-auth/react";
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
const index = ({session}) => {

  const [posts, setPosts] = useState()
  const [deleteStatus, setDeleteStatus] = useState()

  const handleDelete = async(e) => {
    const deleteItem = await fetch('/api/deletepost',{
      method: 'DELETE',
      body: JSON.stringify(session.user.name)
    }).then(res => {
      if(res.ok){
        window.location.reload()
      }
    }).catch(err => console.log(err))
    
  }
  const handleEdit = () => {
    
  }


  useEffect(()=> {
    axios.get('/api/getposts').then(res => setPosts(res.data.getposts))
    
  },[])
 
  return (
    
    <div className='p-2 mt-28'>
      <div className='flex justify-center flex-wrap'>
   
      {posts && posts?.map((i, k) => (
        <div key={k} className="glass flex justify-center text-purple-600 dark:text-sky-500
         w-[300px] h-[300px] flex-col p-2 m-4 flex-wrap hover:scale-110 duration-300 ease-in-out">
          
          <h1 className='mb-auto text-md border-2 dark:border-sky-500 border-purple-600 bg-slate-900 p-2
           rounded-xl hover:rounded-3xl ease-linear duration-300 cursor-pointer text-center'>
            
            {i.title}
            
            </h1>
          
          <p className='text-md border-2 dark:border-sky-500 border-purple-600 bg-slate-900 p-2
           rounded-xl mt-auto hover:rounded-3xl ease-linear duration-300 cursor-pointer wordwrap'>
            <strong className='underline '>Message</strong>: {i.description}</p>

          <p className='text-md border-2 dark:border-sky-500 border-purple-600 bg-slate-900 p-2
           rounded-xl mt-auto hover:rounded-3xl ease-linear duration-300 cursor-pointer'>
            <strong className='underline'>Author</strong>: {i.author}</p>

           
            {i.author === session?.user.name ?
           <div className='ml-auto'>
                <MdDeleteForever onClick={handleDelete} className='text-5xl text-red-600 mt-4 ml-4
                 bg-slate-900 rounded-xl p-2 hover:animate-pulse cursor-pointer ease-linear duration-500'/>

               
           </div> : null}
          
        </div>
        
      ))}
      
      </div>
 
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

 
  return {
    props: { session },
  };
}

export default index