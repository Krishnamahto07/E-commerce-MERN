import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {useParams} from "react-router-dom";
import { getProductDetail } from '../../services/operations/product';
import ReactStars from "react-rating-stars-component";
import Loading from '../layout/Loading';
import { Reviewcard } from '../layout/Reviewcard';

export const ProductDetails = () => {
    const {id} = useParams();
    const [productData,setProductData] = useState();
    
    useEffect(()=>{
        const fetchData = async function(){
            const res = await getProductDetail(id);
            setProductData(res?.product);
        }
        fetchData();
    },[id])
    console.log("product Data = ",productData);
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth < 600 ? 30 : 35,
        value:productData?.rating,
        isHalf:true,
      };
  return (
    // parent div
    <div className='w-screen overflow-x-hidden flex flex-col bg-gray-300'>
    <div className='w-full  flex md:flex-row flex-col '>
        {/* Child 1 */}
        <div className='md:w-1/2 w-full border '>
            <div className='w-full md:h-[600px] md:mt-10 mt-3'>
                <Carousel>
                {
                    productData?.images && productData.images.map((item,i)=> 
                (
                    <div key={item.url} className='flex justify-center items-center '>
                        <img 
                            className='object-fill  h-[400px] w-[400px]  rounded-xl shadow-2xl'
                            key={item.url}
                            src={item.url}
                            alt={`${i} Slide`}
                        />
                    </div>
                )
            )
                }
            </Carousel>
            </div>
        </div>
        {/* child 2 */}
        <div className='md:w-1/2 w-full border'>
            {
                productData?(
                    <div className='flex w-full flex-col gap-2 mt-8 ml-4'>
                        <div className='m-2'>
                            <h2 className='font-bold text-4xl text-gray-700'>{productData.name}</h2>
                            <p className='text-black mt-2'>Product # {productData._id}</p>
                        </div>

                        <div className='flex gap-2 flex-col'>
                            <div className='w-full h-[2px] bg-gray-400 my-2 '></div>
                                <div className='text-xl flex gap-2 text-gray-600'>
                                    <ReactStars {...options} />
                                    <span>({productData?.reviews?.length} Reviews)</span>
                                </div>
                            <div className='w-full h-[2px] bg-gray-400 my-2'></div>
                        </div>

                        <div>
                            <h1 className='text-xl p-2 font-bold text-pink-900 '>{`₹ ${productData.price}`}</h1>

                            <div className='flex gap-2'>


                                {/* button */}
                                <div>
                                    <div className="relative flex items-center max-w-[8rem]">
                                        <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                                        <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div> 
                                {""}

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
                        </div>

                        <p className='pt-4 text-xl '>
                            Status : {""}
                            <b className={productData.stock < 1 ?"text-red-500" :"text-green-500"}>
                                {productData.stock < 1 ? "OutOfStock":"InStock"}
                            </b>
                        </p>

                        <div className='flex font-semibold mt-2 text-xl '>
                            Description : <p className='pl-1'> {productData.description} .</p></div>
                        </div>

                        <button className="mr-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:mt-2 mt-4 md:mb-0 mb-8">Submit Review</button>
                    </div>
                ):(
                    <Loading />
                ) 
            }
            
        </div>
    </div>
            {/* Reviews section */}

        <div className='w-full mt-4'>
            <h3 className='text-3xl text-gray-400 text-center'>REVIEWS</h3>
            <div className="md:w-1/3 w-1/2 mt-2 h-[2px] mx-auto bg-gray-400"></div>
            <div className='flex md:flex-row flex-col'>
            {
                productData?.reviews && productData.reviews[0] ? (
                        
                            productData.reviews.map((review,index)=> 
                                <Reviewcard key={index} review={review} />
                            )
                        
                    
                ):(
                    <div className='text-center mx-auto text-3xl my-5 text-gray-700 font-semibold '>
                        No Review Yet !!!</div>
                )
            }
            </div>
        </div>
    </div>
  )
}
