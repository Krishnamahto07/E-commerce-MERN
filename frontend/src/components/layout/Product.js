import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

export const Product = ({product}) => {
  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 600 ? 20 : 25,
    value:2.5,
    isHalf:true,
  };
  return (
    
    <Link to={product._id}
    className='w-[18vmax] flex flex-col 
    text-[rgb(48,48,48)] m-[2vmax]  pb-[0.5vmax] border border-black p-2 rounded-md hover:scale-105 transition-all duration-300 ease-out
    bg-blue-200'>
      <img src={product.images[0].url} alt={product.name} 
      className='w-[18vmax] rounded-sm'/>
      <p className='text-xl font-bold mt-1 text-gray-800'>{product.name}</p>
      <div className='flex flex-col'>
        <div className=''><ReactStars {...options} /></div>
        <span className='text-gray-700'>(256 Reviews)</span>
      </div>
      <span className='text-xl font-bold text-red-500'>{product.price}</span>
    </Link>
  )
}
