import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BsClipboardPlus } from 'react-icons/bs'
import { FiSun, FiMoon } from 'react-icons/fi'
const Navbar = () => {
  const { data: session } = useSession();

  const [theme, setTheme] = useState();
  const [icon, setIcon] = useState();

  useEffect(() => {
    
    setTheme(localStorage.Theme);

    if (localStorage.Theme == "dark") {
      document.querySelector("html").classList.add("dark");
      setIcon(<FiMoon />);
      document.body.style.cssText = `background-image: url('/night.jpg');`  

    } else {
      document.querySelector("html").removeAttribute("class");
      setIcon(<FiSun />);
      document.body.style.cssText = `background-image: url('/sun.jpg');`  

    }
  }, []);

  const handleTheme = () => {
      const htmlEl = document.querySelector("html").classList;

      htmlEl.toggle("dark");

      if (htmlEl == "dark") {
        localStorage.setItem("Theme", "dark");
        setIcon(<FiMoon className="animate text-sky-500" />);
        document.body.style.cssText = `background-image: url('/night.jpg');`  
      } else {
        localStorage.setItem("Theme", "light");
        setIcon(<FiSun className="animate text-purple-600" />);
        document.body.style.cssText = `background-image: url('/sun.jpg');`  
      
      } 
    };

  return (
    <div>
      <ul className="flex flex-wrap p-2 family-font bg-slate-900 wordwrapnav">
        <Link href={"/"}>
          <a
            className="text-xl text-purple-600 p-2 m-2  rounded-xl hover:bg-slate-800  hover:dark:bg-slate-800
             border-zinc-800 dark:border-sky-500 dark:text-sky-500  ease-linear duration-300"
          >
            Home
          </a>
        </Link>

        {!session && (
          <Link href={"/login"}>
            <a
              className="text-xl text-purple-600 p-2 m-2  rounded-xl hover:bg-slate-800  hover:dark:bg-slate-800
             border-zinc-800 dark:border-sky-500 dark:text-sky-500 ml-auto ease-linear duration-300"
            >
              Login
            </a>
          </Link>
        )}

        {session && (
          <div className="flex ml-auto">
            <Link href={'/newpost'}>
             <a

              className="text-3xl mt-[8px] text-purple-600 p-2 m-2 rounded-xl hover:bg-slate-800 hover:dark:bg-slate-800
                border-zinc-800 dark:border-sky-500
                dark:text-sky-500 ml-auto ease-linear duration-300 cursor-pointer"
            >
              <BsClipboardPlus />
              
            </a>
            </Link>
            <a
              onClick={() =>
                document
                  .getElementById("handleinfoBox")
                  .classList.toggle("hide")
              }
              className="text-2xl text-purple-600 p-2 m-2 rounded-xl hover:bg-slate-800 hover:dark:bg-slate-800
                border-zinc-800 dark:border-sky-500
                dark:text-sky-500 ml-auto ease-linear duration-300 cursor-pointer"
            >
              {session?.user.name}
              
            </a>
          </div>
        )}

        <li
          className="text-3xl mt-4 text-purple-600 dark:text-sky-500 cursor-pointer h-fit mr-4"
          onClick={handleTheme}
        >
          {icon}
        </li>
      </ul>

      {session && (
        <div className="flex justify-end">
          <div
            id="handleinfoBox"
            className="hide absolute text-center flex justify-center p-4  border-2 z-10
                 w-[200px]  right-0 top-20 mt-2 text-purple-600 dark:text-sky-500 userbox navglass animatebox"
          >
            <div className="flex flex-col font-semibold">
            
              <h1>{session?.user.email?.length > 15  ?
               <p>{session?.user.email.slice(0, 4)}...{session?.user.email.slice(10)}</p>
                : session?.user.email}</h1>
              <img
                src={session?.user.image}
                className="rounded-full w-[70px] h-[70px] ml-auto mr-auto mt-4"
              />
              <p>{session?.user.name}</p>
              <a
                onClick={() => signOut()}
                className="text-xl text-purple-600 p-2 m-2  rounded-xl bg-slate-800 hover:bg-slate-800  hover:dark:bg-slate-800
                      border-zinc-800 dark:border-sky-500 dark:text-sky-500  ease-linear duration-300 cursor-pointer"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
