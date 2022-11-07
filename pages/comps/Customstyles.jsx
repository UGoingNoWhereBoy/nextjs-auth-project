import Link from 'next/link';




const Btn = ({btnName , goTo}) => {
    return (
    <Link href={goTo}>
    <p className='text-lg border-2 border-purple-600 dark:border-sky-500 w-[150px] mr-auto ml-auto mt-4 rounded-xl p-[1px]
    hover:w-[200px] hover:dark:bg-sky-500 hover:dark:border-gray-900 hover:dark:text-gray-900
  hover:text-gray-900 hover:border-gray-900 hover:bg-purple-600 bg-gray-900
    ease-linear duration-200 font-semibold cursor-pointer'>{btnName}</p>
    </Link>
    )
}


export default Btn;