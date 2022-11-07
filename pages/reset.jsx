import React from 'react'
import Submitbtn from './comps/Customstyles'



const reset = () => {
  return (

    <div className='className="flex justify-center mt-20 animatebody"'>

        <div className="border-2 p-10 text-rose-600 dark:text-sky-500 glass text-center">


        <form className="flex flex-col">

        <div  className="flex border-2 border-rose-600 dark:border-sky-500 rounded-xl bg-slate-900 w-[250px] ml-auto mr-auto">


            <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="m-2 bg-transparent outline-none w-full"
            id="emailinput"
            required
            />
        </div>
            
        <button
              type="submit"
              className='text-lg border-2 border-rose-600 dark:border-sky-500 w-[200px] mr-auto ml-auto mt-4 rounded-xl p-[1px]
              hover:w-[200px]
              hover:dark:bg-sky-500 hover:dark:border-gray-900 hover:dark:text-gray-900
              hover:text-gray-900 hover:border-gray-900 hover:bg-rose-600 bg-gray-900 ease-linear duration-200 font-semibold'>
              Reset my password
            </button>

            </form>
            
      </div>
    </div>
    )
}



export default reset;