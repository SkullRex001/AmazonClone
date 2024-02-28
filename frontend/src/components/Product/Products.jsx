import React, { useEffect, useState } from 'react'
import './Products.css'
import { getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import Product from '../Home/Product'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Bounce } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import NoProductFount from './NoProductFount.jsx'

const Categories = [
   "All" ,  "Laptop" , "Footwear" , "Bottom" , "Tops" , 
    "Attire" , "Camera" , "SmartPhone"
]


const Products = () => {
    const [liClass , setListClass] = useState(Array(9).fill("Notclicked"))
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category , setCategory] = useState("")
    function Clicked(id){
        
      
    }
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {

        setPrice(newPrice)

    }


    const dispatch = useDispatch()
    const { loading, error, product, productCount, productPerPage , filteredProductsCount } = useSelector(state => state.products)

    

    const { keyword } = useParams()

    useEffect(() => {

        if (error) {
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

        dispatch(getProduct(keyword, currentPage , price ,category))
    }, [dispatch, error, keyword, currentPage , price , category])


    console.log(product[0])



    return (
        <>
            {loading ? (<Loader />) :(<>
                <h1 className="productHeading">Products</h1>
                <div className="products">
                    {
                        product && product.map((EachProduct, index) => {

                            return <Product product={EachProduct} key={index} />
                        })}
                </div>

               <div className='filterDiv'>
                <div className="filterBox">
                    <h3>Filter</h3>
                    <Typography>
                        Price
                    </Typography>

           

                    <Slider

                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={25000}
                        step={1000}

                    />
                    
                    <div className="categoryyBox">
                    <Typography>
                        Categories
                    </Typography>

                    <ul className='categoryBox'>
                        {
                            Categories.map((item , index)=>{
                              return ( <li className={""} key={index} onClick={()=>{setCategory(item) , Clicked()}}>
                                    {item}

                                </li>)
                            })
                        }

                    </ul>
                    </div>
                    



                </div>

                </div>

                {
                    //feature to not display pagination when not requirded is left to impelemet 7h
                    filteredProductsCount > productPerPage && (
                        <div className="paginationBox">
                            <Pagination

                                activePage={currentPage}
                                itemsCountPerPage={productPerPage}
                                totalItemsCount={productCount}
                                onChange={setCurrentPageNo}
                                nextPageText={<GrCaretNext />}
                                prevPageText={<GrCaretPrevious />}
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'

                            />


                        </div>
                    )

                }





            </>)}

        </>
    )
}

export default Products