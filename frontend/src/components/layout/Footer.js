import React from 'react'
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className='w-screen overflow-x-hidden'>
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
    md:flex  items-center justify-evenly px-5 py-10 w-screen  text-white  mb-0">
        <div className='flex flex-col
        justify-center items-center gap-4 mx-auto 
        md:w-1/3'>
            <h2 className='text-2xl font-semibold text-white'>Download Our App</h2>
            <h4 className='text-xl font-semibold text-white text-center'>Download App for Ios and Android Mobile</h4>
            <div className='bg-slate-900 py-2 px-4 rounded-lg flex flex-col justify-center items-center'>
                <div>Get it On</div>
                <div className='flex justify-center items-center gap-2'>
                    <div className='text-xl'><IoLogoGooglePlaystore /></div>
                    <p>Google Play</p>
                </div>
            </div>
            <div className='bg-slate-900 py-2 px-4 rounded-lg flex flex-col justify-center items-center '>
                <div>Get it On</div>
                <div className='flex justify-center items-center gap-2'>
                    <div className='text-xl'><FaApple /></div>
                    <p>Google Play</p>
                </div>
            </div>
        </div>
        <div className='md:w-1/3 flex flex-col items-center justify-center gap-11 '>
            <h1 className='text-4xl font-bold text-pink-800 mt-4'>E-COMMERCE</h1>
            <p>High Quality is our first priority</p>
            <p className='underline'>Copyright 2024 @krishnaMahto</p>
        </div>
        <div className='md:w-1/3 flex flex-col gap-3 underline font-semibold justify-center items-center'>
            <p className='text-xl font-semibold'>Follow Us</p>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>Youtube</p>
            <p>Linked In</p>
        </div>
    </div>
    </div>
  )
}
