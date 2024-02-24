import axios from 'axios'
import { ALL_PRODUCT_FAIL , ALL_PRODUCT_REQUEST , ALL_PRODUCT_SUCCESS  , CLEAR_ERRORS } from "../constants/productConstants";

export const getProduct = ()=> async (dispatch) =>{
    try{
        dispatch({type : ALL_PRODUCT_REQUEST});

        // const {data} = await axios.get("http://localhost:3000/api/v1/product")
        // console.log(data)

        // const response = await fetch('http://localhost:3000/api/v1/product')
        // const data = await response.json()


        const response = await axios.get('http://localhost:3000/api/v1/product');

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload : response.data
        })

    }

    catch(err) {
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload : err.response.data.message || 'Failed to fetch products'
        })
       

    }
}

// Clearing Errors

export const clearErrors = () => async (dispatch)=>{
    dispatch({type : CLEAR_ERRORS})
}