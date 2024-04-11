import React, { useEffect, useState } from 'react'
import { CgMouse } from "react-icons/cg";
import { Product } from './Product';
import {useSelector , useDispatch} from "react-redux"
import { getAllProducts } from '../../services/operations/product';
import {setProduct} from '../../redux/productSlice'
import Loading from './Loading';

export const Home = () => {
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true);
  useEffect(()=>{
    setLoading(true);
    const getProducts = async()=>{
      const res = await dispatch(getAllProducts)
      dispatch(setProduct(res));
    }
    getProducts();
    // for(let i=0;i<10000000;i=i+0.002);
    setLoading(false);
  },[dispatch]);
  let products  = useSelector((state) => state.product);
  products = products.product;
  let temp = products?.length;
  return (
    <div className='overflow-x-hidden'>
    {
      loading ? (
        <div className='w-screen h-screen text-center'><Loading /></div>
      ) :(
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
        <div id='container' className='flex w-full flex-wrap mx-auto justify-center items-center '>
            {
              products?.map((product,index)=>(
                <Product product={product} key={index} />
              ))
            }
        </div>
      </div>
      )
    }
    </div>
    
  )
}
