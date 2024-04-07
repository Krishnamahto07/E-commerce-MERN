import React from 'react'
import { CgMouse } from "react-icons/cg";

import { Link } from 'react-router-dom'
export const Home = () => {
  return (
    <>
      <div className='w-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-full
      flex flex-col justify-center items-center gap-9 py-8 text-white'>
        <p className='text-3xl font-semibold'>Welcome to E commerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <Link to="/container"> 
        <button type="button" class="flex gap-2 justify-center items-center bg-gradient-to-r from-green-300 to-gray-900  hover:from-pink-500 hover:to-yellow-500 
      transition-all duration-500 ease-in hover:scale-90 px-4 py-2 rounded-lg ">
          <spna>Scroll</spna> <CgMouse/>
        </button>
        </Link>
      </div>
    </>
  )
}
