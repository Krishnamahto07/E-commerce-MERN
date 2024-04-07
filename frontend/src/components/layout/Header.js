import React, { useState } from 'react'
import { BiLogoEdge } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { Link  } from 'react-router-dom';
export const Header = () => {

        let Links = [
            {name:"HOME",link:"/"},
            {name:"Product",link:"/product"},
            {name:"Contact",link:"/contact"},
            {name:"About",link:"/about"},
        ]

        let [open , setOpen] = useState(false)
  return (
// 
    <div className='shadow-md bg-white w-full fixed top-0 left-0'>
        <div className="md:flex items-center justify-between md:px-10 py-4 px-7 font-semibold">
            <div className='flex justify-center items-center'>
                <div className='text-2xl'><BiLogoEdge /></div>
                <span className=''>commerce</span>
            </div>

            {/* Menu button */}
            <div className='text-3xl absolute right-8 top-3 cursor-pointer md:hidden'
            onClick={()=>setOpen(!open)}>
                {
                    open ? (<IoCloseSharp />):( <IoReorderThreeOutline />)
                }
            </div>

            <ul className={`md:flex gap-8 md:items-center md:pb-0
            pb-12 absolute md:static bg-white 
            md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 
            transition-all duration-500 ease-in 
            ${open ? 'top-10 opacity-100':'top-[490px]'} md:opacity-100 opacity-0`}>
                {
                    Links.map((link,index)=>(
                        <li key={index} className='md:my-0 my-7 active:text-[#004040]'
                        onClick={()=>setOpen(!open)}>
                            <Link to={link.link} className='hover:text-[#004040] duration-500' >{link.name}</Link>
                            
                        </li>
                    ))
                }
            <div className='md:flex md:gap-5 gap-5 text-2xl '>
                <div className='md:my-0 my-7 hover:scale-90	transition-all duration-300 ease-in'><IoSearch /></div>
                <div className='md:my-0 my-7 hover:scale-90	transition-all duration-300 ease-in'><IoBagHandleOutline /></div>
                <div className='md:my-0 my-1 hover:scale-90	transition-all duration-300 ease-in'><MdOutlineAccountCircle /> </div> 
            </div>
            </ul>
        </div>
    </div>
  )
}
