import React, { useEffect } from 'react'
import './Products.css'
import { getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import Product from '../Home/Product'
import { useDispatch , useSelector } from 'react-redux'
import { toast  , Bounce} from 'react-toastify'



const Products = () => {
    const dispatch  = useDispatch()
    const {loading , error , product , productCount} = useSelector(state =>state.products)

    useEffect(()=>{

        if(error) {
            return toast.info(error, {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });
          }

        dispatch(getProduct())
    } , [dispatch , error])



  return (
    <>
    {loading ? (<Loader/>): (<>
        <h1 className="productHeading">Products</h1>
        <div className="products">
            {
                product && product.map((EachProduct , index)=>{

                    return <Product product={EachProduct} key={index}/>
            })}
        </div>
        </>)}

    </>
  )
}

export default Products