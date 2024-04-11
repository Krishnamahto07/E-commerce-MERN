import React from 'react'
import { RiAccountCircleFill } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";

export const Reviewcard = ({review}) => {
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth < 600 ? 30 : 35,
        value:review?.rating,
        isHalf:true,
      };
    console.log("review : ",review);
  return (
    <div className='border flex flex-col  items-center py-4 gap-2 w-full'>
        {/* <img src={} alt='User' /> */}
        <div className='text-6xl text-center'><RiAccountCircleFill /></div>
        <p className='text-xl font-bold'>{review.name}</p>
        <ReactStars {...options} />
        <span className='text-gray-600 font-semibold'>{review.comment}</span>
    </div>
  )
}
