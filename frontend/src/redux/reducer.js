import {combineReducers} from '@reduxjs/toolkit';
import productReducers from './productSlice';
const rootReducer = combineReducers(
    {
        product : productReducers,    
    }
);
export default rootReducer;