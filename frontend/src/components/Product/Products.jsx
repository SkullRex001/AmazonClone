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


const Products = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
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

        dispatch(getProduct(keyword, currentPage , price))
    }, [dispatch, error, keyword, currentPage , price])



    return (
        <>
            {loading ? (<Loader />) : (<>
                <h1 className="productHeading">Products</h1>
                <div className="products">
                    {
                        product && product.map((EachProduct, index) => {

                            return <Product product={EachProduct} key={index} />
                        })}
                </div>


                <div className="filterBox">
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