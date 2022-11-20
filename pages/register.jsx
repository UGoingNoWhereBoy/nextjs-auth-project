import React, { useState } from "react";
import { useRouter } from 'next/router'
import { SlUser } from "react-icons/sl";
import { RiLockPasswordLine} from "react-icons/ri";
import { BiShow, BiHide, BiWorld, BiError } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { SiReact } from 'react-icons/si'
import "@djthoms/pretty-checkbox";
import { useSession, getProviders} from "next-auth/react";
import Btn from "./comps/Customstyles";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Tooltip } from '@nextui-org/react';
import { getSession } from 'next-auth/react'


const login = ({ providers }) => {

  const { data: session } = useSession();

  const [passIcon, setPassicon] = useState(<BiShow />);

  const [isHidden, setHidden] = useState(true)

  const [hasError, setError] = useState()
  
  const [loading, setLoading] = useState()

  let router = useRouter()


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    
    validationSchema: Yup.object({
      name: Yup.string().matches(/^\S*$/, "You cant use spaces")
      .max(12, 'Must be 12 characters or less').required("This field is required"),
      password: Yup.string().required('This field is required')
      .min(8, 'Your password length should be greater then 8')
      .max(26, 'Your password length should be less then 26'),
      email: Yup.string().email('Invalid Email').required('This field is required')
    }),

    onSubmit: async(values) => {
      setLoading(true)
      let res = await fetch("http://localhost:3000/api/createuser", {
        method: "POST",
        body: JSON.stringify(values),
        
      });
    
      if(res.ok){
        setLoading(false)
        setError('false')
        setTimeout(() => {
          router.push('/login')
        }, 2000);
      }
      setLoading(false)
      res.status == '422' ? setError('emailInUse') : 
      res.status == '421' ? setError('nameInUse') : 
      res.status == '404' ? setError('noData') : null
      

    } 
    
  })

 

  const handleshowPassword = () => {

    let togglePass = document.querySelectorAll("input")[2];
    
    togglePass.type === "password" ? setHidden(false) : setHidden(true)

    isHidden 
      ? togglePass.type = 'text'
      :  togglePass.type = 'password'

    isHidden
      ? setPassicon(<BiHide className="animatepass" />)
      : setPassicon(<BiShow className="animatepass" />)
        
      
  };

  return (
    <div className="flex justify-center mt-20 animatebody">
      {!session && (
        <div>

        {hasError && <div className="
          flex justify-center text-center text-3xl border-2
          border-red-600 rounded-xl bg-slate-900 p-2 mb-2">
          {hasError == 'emailInUse' ? <p className="text-red-600">Email in use</p> : null}
          {hasError == 'nameInUse' ? <p className="text-red-600">Username in use</p> : null}
          {hasError == 'noData' ? <p className="text-red-600">No Data in use</p>  : null}
          {hasError === 'false' ? <p className="text-green-600">Account created, redirecting..</p>: null}
          </div>}


        {loading && <div className="text-2xl text-green-600 text-center mb-4">Loading..</div>}
        <div className="border-2 p-10 text-purple-600 dark:text-sky-500 glass w-[400px]">
              
          <SiReact className="text-4xl text-center ml-auto mr-auto mb-6 animateglobe"/>

          <form  className="flex flex-col" onSubmit={formik.handleSubmit}>
      
            <div className="flex ml-2 border-2 border-purple-600 dark:border-sky-500 rounded-xl bg-slate-900 mb-4">
            
              <SlUser className="text-purple-600 dark:text-sky-500 text-3xl mt-auto mb-auto ml-2" />
           
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter your username"
                className="m-2 bg-transparent outline-none w-full"
                
              />
              {formik.errors.name
                  ? <Tooltip content={`${formik.errors.name}`} color="error">
                    <BiError className="text-purple-600 dark:text-sky-500 text-3xl mt-auto mb-auto ml-auto mr-2"/>
                    </Tooltip>
                  : null}
                
            </div>
            
            <div className="flex ml-2 border-2 border-purple-600 dark:border-sky-500 rounded-xl bg-slate-900">
              <MdAlternateEmail className="text-purple-600 dark:text-sky-500 text-3xl mt-auto mb-auto ml-2" />

              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter your Email"
                className="m-2 bg-transparent outline-none w-full"
              />
               {formik.errors.email
                  ? <Tooltip content={`${formik.errors.email}`} color="error">
                      <BiError className="text-purple-600 dark:text-sky-500 text-3xl mt-auto mb-auto ml-auto mr-2"/>
                    </Tooltip>
                  : null}
            </div>

            <div className="flex ml-2 border-2 border-purple-600 dark:border-sky-500  rounded-xl mt-4 bg-slate-900">
              <RiLockPasswordLine className="text-purple-600 dark:text-sky-500 text-3xl mt-auto mb-auto ml-2" />

              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter your Password"
                className="m-2 bg-transparent outline-none w-full"
                
                
              />
               {formik.errors.password
                  ? <Tooltip content={`${formik.errors.password}`} color="error">
                      <BiError className="text-purple-600 dark:text-sky-500 text-3xl mt-auto mb-auto ml-auto mr-2"/>
                    </Tooltip>
                  : null}
              <p
                className="mt-auto mb-auto mr-2 text-3xl cursor-pointer"
                onClick={handleshowPassword}
              >
                {passIcon}
              </p>
            </div>

            <button
              type="submit"
              className="text-lg border-2 border-purple-600 dark:border-sky-500 w-[150px] mr-auto ml-auto mt-4 rounded-xl p-[1px]
                   hover:w-[200px]
                   hover:dark:bg-sky-500 hover:dark:border-gray-900 hover:dark:text-gray-900
                   hover:text-gray-900 hover:border-gray-900 hover:bg-purple-600 bg-gray-900 ease-linear duration-200 font-semibold"
            >
              Register
            </button>
          </form>

         

          <div className="text-center mt-2 text-purple-600 dark:text-sky-500 font-bold bg-slate-900 rounded-xl p-2">
            Already have an account?
            <Btn goTo={"/login"} btnName={"Login"} />
          </div>
          
        </div>
        </div>
      )}
    </div>
  );
};


export async function getServerSideProps({req}) {
  const providers = await getProviders();
  const session = await getSession({req})
  if(session){
    return{
        redirect:{
            destination: '/',
            premanent: false,
        }
    }
}
  return {
    props: { providers },
    props:{session}
  };
}
export default login;
