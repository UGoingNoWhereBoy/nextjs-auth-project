import React from 'react'
import { useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import { useFormik } from "formik";
import { BsCardHeading } from 'react-icons/bs'
import * as Yup from 'yup';

const newpost = () => {
    
    const { data: session } = useSession();
    
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        }
    })

    return (
    <div className=''>
    {session ? 
    <div className='mt-20  flex justify-center'>
        <div className=' border-2 w-[500px] h-[500px] glass'>
           
            <div className="flex ml-2 border-2 border-purple-600 dark:border-sky-500 rounded-xl bg-slate-900 mb-4">
            
            <BsCardHeading className="text-purple-600 dark:text-sky-500 text-3xl mt-auto mb-auto ml-2" />
            <form onSubmit={formik.handleSubmit} className='flex flex-col'>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Title"
              className="m-2 bg-transparent outline-none w-full"
              
            />
            {formik.errors.name
                ? <Tooltip content={`${formik.errors.title}`} color="error">
                  <BiError className="text-purple-600 dark:text-sky-500 text-3xl mt-auto mb-auto ml-auto mr-2"/>
                  </Tooltip>
                : null}

                 <input
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="description"
              className="m-2 bg-transparent outline-none w-full"
              
            />
            {formik.errors.name
                ? <Tooltip content={`${formik.errors.title}`} color="error">
                  <BiError className="text-purple-600 dark:text-sky-500 text-3xl mt-auto mb-auto ml-auto mr-2"/>
                  </Tooltip>
                : null}
                
            </form>
            </div>
        </div>
    </div> : <h1>User not sigend in</h1>}
    </div>
  )
}

export async function getServerSideProps({req}){
    const session = await getSession({req})

    if(!session){
        return{
            redirect:{
                destination: '/login',
                premanent: false,
            }
        }
    }
    return {
        props:{session}
    }
}


export default newpost