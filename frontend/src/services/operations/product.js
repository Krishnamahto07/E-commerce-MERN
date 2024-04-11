import { productEndpoints } from "../api";
import {apiConnector} from "../apiConnector";

const {GET_PRODUCT_API ,GET_PRODUCT_DETAIL} = productEndpoints;

export const getAllProducts = async()=>{
    let result = [];
    try{        
       let response =  await apiConnector("GET",GET_PRODUCT_API);        

        if(!response){
            throw new Error("Coutn Not fetch products");
        }
        result = response?.data.products;
    }catch(error){
        console.log("GET_ALL_PRODUCT_API ERROR............", error)
    }
    return result;
}

export const getProductDetail = async(id)=>{
    let result ;
    try{        
       let response =  await apiConnector("POST",GET_PRODUCT_DETAIL,{id});  
       if(!response){
           throw new Error("Coutn Not fetch products");
        }
        result = response?.data;
    }catch(error){
        console.log("GET_PRODUCT_DETAIL_API ERROR............", error)
    }
    return result;
}




