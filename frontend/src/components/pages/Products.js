import React, { useEffect, useState } from 'react'
import {useSelector , useDispatch} from "react-redux"
import { getAllProducts } from '../../services/operations/product';
import {setProduct} from '../../redux/productSlice'
import Loading from '../layout/Loading';
import { Product } from '../layout/Product';
export const Products = () => {

    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        const getProducts = async()=>{
            const res = await dispatch(getAllProducts)
            dispatch(setProduct(res));
            
        }
        getProducts();
        setLoading(false);
    },[dispatch])


    let products  =  useSelector((state) => state.product);
    products = products.product;
    console.log(products);
  return (
    <div>
        {
            loading ? (
                <Loading />
            ):
            (
                <div className='flex justify-center items-center flex-col gap-3 mt-5'>
                    <h2 className='text-3xl text-center font-bold'>Products</h2>
                    <div className='w-1/3 h-[2px] bg-gray-400 mx-auto shadow-2xl shadow-blue-800'></div>
                    <div className='flex flex-wrap justify-center items-center'>
                    {
                        products?.map((product)=>(
                           <Product key={product._id} product={product} /> 
                        ))
                    }
                    </div>
                    
                </div>
            )
        }
    </div>
  )
}
