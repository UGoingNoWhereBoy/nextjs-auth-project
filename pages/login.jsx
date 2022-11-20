import React, { useState as UseState } from "react";
import { SlUser } from "react-icons/sl";
import { RiLockPasswordLine, RiGithubFill } from "react-icons/ri";
import { AiFillGoogleCircle } from "react-icons/ai";
import { SiDiscord, SiReact } from "react-icons/si";
import { BiShow, BiHide } from "react-icons/bi";
import "@djthoms/pretty-checkbox";
import { useSession as UseSession, getProviders, signIn } from "next-auth/react";
import { getSession } from 'next-auth/react'
import Btn from "./comps/Customstyles";
import { useFormik as UseFormik } from "formik";

const login = ({ providers }) => {

  const { data: session } = UseSession();

  const [passIcon, setPassicon] = UseState(<BiShow />);

  const [isHidden, setHidden] = UseState(true)

  const [userStatus, setUserStatus] = UseState('')

  const [loading, setLoading] = UseState()

  
  const formik = UseFormik({
    initialValues: {
      name: '',
      password: '',
    },
 
    onSubmit: async(values) => {

      setLoading(true)

      signIn('credentials', {
        ...values,
        redirect: false,
        
       }).then(res => {

        if (!res.ok){
          setLoading(false)
          setUserStatus('error')
        }
        

       }).catch(err => {
        setLoading(false)
        console.log(err)
       })
      
       
    }
  
  })


  const handleshowPassword = () => {

    let togglePass = document.querySelectorAll("input")[1];
    
    togglePass.type === "password" ? setHidden(false) : setHidden(true)

    isHidden 
      ?  togglePass.type = 'text'
      :  togglePass.type = 'password'

    isHidden
      ? setPassicon(<BiHide className="animatepass" />)
      : setPassicon(<BiShow className="animatepass" />)
        
      
  };


  return (
    <div className="flex justify-center mt-20 animatebody">
      
      {session ? location.reload()  : (
        <div>
        
       {userStatus === 'error' && <div className="
          flex justify-center text-center text-3xl border-2
          border-red-600 rounded-xl bg-slate-900 p-2 mb-2 w-[450px]">
          <p className="text-red-600">Invalid username or password</p>
          </div>}

        <div className="border-2 p-10 text-purple-600 dark:text-sky-500 glass w-[450px] bg-slate-900">

          <SiReact className="text-4xl text-center ml-auto mr-auto mb-6" />

          <form className="flex flex-col" onSubmit={formik.handleSubmit}>
                
            <div  className="flex ml-2 border-2 border-purple-600 dark:border-sky-500 rounded-xl bg-slate-900">

              <SlUser className="text-purple-600 dark:text-sky-500 text-2xl mt-auto mb-auto ml-2" />

              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter your username"
                className="m-2 bg-transparent outline-none w-full"
                required
              />
            </div>

            <div className="flex ml-2 border-2 border-purple-600 dark:border-sky-500  rounded-xl mt-4 bg-slate-900">
              <RiLockPasswordLine className="text-purple-600 dark:text-sky-500 text-2xl mt-auto mb-auto ml-2" />

              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter your Password"
                className="m-2 bg-transparent outline-none w-full"
                required
              />

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
              Login
            </button>
            
          </form>
            <h1 className="text-center mt-4 text-2xl bg-slate-900 rounded-xl">Quick login</h1>
          <div className="mt-4 flex justify-center border-2 dark:border-sky-500 border-purple-600 bg-slate-900 rounded-xl">
            <div className="flex dark:text-sky-500 text-purple-600 text-4xl">
              <AiFillGoogleCircle
                onClick={() => signIn(providers.google.id)}
                className="m-2 hover:scale-110 cursor-pointer duration-200 ease-linear"
              />
              <RiGithubFill
                onClick={() => signIn(providers.github.id)}
                className="m-2 hover:scale-110 cursor-pointer duration-200 ease-linear"
              />
              <SiDiscord
                onClick={() => signIn(providers.discord.id)}
                className="m-2 hover:scale-110 cursor-pointer duration-200 ease-linear"
              />
            </div>
          </div>

          <div className="text-center mt-4 font-extrabold bg-slate-900 p-2 rounded-xl">
            Dont have an account?
            <Btn goTo={"/register"} btnName={"Register"} />
          </div>
        </div>
        </div>
      )}
    </div>
  );
};


export async function getServerSideProps({req}) {
  
  const session = await getSession({req})
  if(session){
    return{
        redirect:{
            destination: '/',
            premanent: false,
        }
    }
  }
  if(!session){
    const providers = await getProviders();
    return {
      props: { providers },
    }
  }
  return {
    
    props:{session}
  };
}

export default login;
