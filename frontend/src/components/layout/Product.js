import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

export const Product = ({product}) => {
  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 600 ? 20 : 25,
    value:product.ratings,
    isHalf:true,
  };
  // console.log("in Card : ",product);
  return (
    
    <Link to={`/product/${product._id}`}
    className='w-[18vmax] flex flex-col 
    text-[rgb(48,48,48)] m-[2vmax]  pb-[0.5vmax]  p-2 rounded-md hover:scale-95 transition-all duration-300 ease-out
    hover:bg-gray-200 hover:shadow-2xl '>
      <img src={product.images[0].url} alt={product.name} width={100}
      className='w-[18vmax] rounded-sm cover'/>
      <p className='text-xl font-bold mt-2 ml-1 text-gray-800 uppercase'>{product.name}</p>
      <div className='flex flex-col'>
        <div className=''><ReactStars {...options} /></div>
        <span className='text-gray-700'>({product.reviews.length} Reviews)</span>
      </div>
      <span className='text-xl font-bold text-red-500'>{`₹${product.price}`}</span>
    </Link>
  )
}
