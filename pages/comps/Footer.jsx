import { FaLinkedin, FaDiscord, FaGithub } from 'react-icons/fa'




import React from 'react'

const Footer = () => {
  return (
    <div className='absolute w-screen bottom-0 text-center flex justify-center bg-slate-900 fixfooter'>

        <ul className='flex text-purple-600 dark:text-sky-500 font-bold text-2xl mr-auto'>
            
            <a href='https://www.linkedin.com/in/eyad-93327b244'
             className='m-2 cursor-pointer hover:scale-110 ease-linear duration-150'
             target={'_blank'}><FaLinkedin /></a>
            <a href='https://discord.com/users/UGoingNoWhereBoy#1736'
             className='m-2 cursor-pointer hover:scale-110 ease-linear duration-150'
             target={'_blank'}><FaDiscord /></a>
            <a href='https://github.com/UGoingNoWhereBoy'
             className='m-2 cursor-pointer hover:scale-110 ease-linear duration-150'
             target={'_blank'}><FaGithub /></a>
            
        </ul>
        <div className='text-center flex justify-center mr-auto mt-2 text-purple-600 dark:text-sky-500'>
        <a className='mr-28'>Made by UGoingNoWhereBoy</a>
        </div>
    </div>
  )
}

export default Footer