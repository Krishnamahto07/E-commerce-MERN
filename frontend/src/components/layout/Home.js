import React from 'react'
import { CgMouse } from "react-icons/cg";

// import { Link } from 'react-router-dom'
import { Product } from './Product';
export const Home = () => {
  const product = {
    name:"Blue Tshirt",
    images:[{url:"https://static.cilory.com/480395-thickbox_default/octane-blue-full-sleeves-t-shirt-by-nologo.jpg"}],
    price:"Rs. 3000",
    _id:"abhishek",
  };
  return (
    <div className='w-screen bg-[#124076]'>
      <div className='flex flex-col justify-center items-center gap-9 py-8 text-white'>
        <p className='text-3xl font-semibold'>Welcome to E commerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container"> 
          <button type="button" className="flex gap-2 justify-center items-center bg-gradient-to-r from-green-100 to-gray-200  hover:from-pink-500 hover:to-yellow-500 
            transition-all duration-500 ease-in hover:scale-90 px-8 py-4 rounded-lg text-gray-600 hover:text-white">
            <span>Scroll</span> <span className='text-2xl'><CgMouse/></span>
          </button>
        </a>
      </div>

      <h2 className='shadow-2xl text-center
      text-2xl font-semibold text-white underline uppercase '>Featured Products</h2>
      <div className='w-full h-[400px]'>
        hlw
      </div>
      <div id='container' className='flex w-full flex-wrap mx-auto justify-center items-center'>
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
      </div>
    </div>
  )
}
