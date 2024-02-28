import axios from 'axios'
import { ALL_PRODUCT_FAIL , ALL_PRODUCT_REQUEST , ALL_PRODUCT_SUCCESS  , CLEAR_ERRORS , PRODUCT_DETAILS_REQUEST , PRODUCT_DETAILS_SUCCESS , PRODUCT_DETAILS_FAIL} from "../constants/productConstants";

export const getProduct = (keyword = "" , currentPage = 1 , price = [0 , 25000])=> async (dispatch) =>{
    try{
        dispatch({type : ALL_PRODUCT_REQUEST});

        // const {data} = await axios.get("http://localhost:3000/api/v1/product")
        // console.log(data)

        // const response = await fetch('http://localhost:3000/api/v1/product')
        // const data = await response.json()

        const response = await axios.get(`http://localhost:3000/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`);

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



export const getProductDetails = (id)=> async (dispatch) =>{
    try{
        dispatch({type : PRODUCT_DETAILS_REQUEST});

        const response = await axios.get(`http://localhost:3000/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload : response.data.product
        })

    }

    catch(err) {
        dispatch({
            type : PRODUCT_DETAILS_FAIL,
            payload : err.response.data.message || 'Failed to fetch products'
        })
       

    }
}



// Clearing Errors

export const clearErrors = () => async (dispatch)=>{
    dispatch({type : CLEAR_ERRORS})
}