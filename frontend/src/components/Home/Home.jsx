import React , {useEffect} from 'react'
import { CgMouse } from "react-icons/cg";
import './Home.css'
import Product from './Product.jsx'
import MetaData from '../layout/MetaData.jsx';
import { getProduct } from '../../actions/productAction.js';
import { useSelector , useDispatch } from 'react-redux';

const product = {
  name : "Blue Tshirt",
  images : [{url : "https://images.meesho.com/images/products/285711749/uhuxj_512.webp"}],
  price : "Rs 3000",
  _id : "AVS"
}

const Home = () => {
  const dispatch  = useDispatch()
  useEffect(()=>{

    dispatch(getProduct())

  }, [])
  return (
    <>
    <MetaData title="E-Shop"/>

    <div className="banner">
        <p>Welcome to E-Shop</p>
        <h1>Find Amazing Products Below</h1>

        <a href="#container"><button>Scroll <CgMouse /></button></a>

    </div>
    <h2 className='homeHeading'>Featured Products</h2>
    <div className="container" id='container'>
      <Product product = {product}/>
      <Product product = {product}/>
      <Product product = {product}/>
      <Product product = {product}/>

      <Product product = {product}/>
      <Product product = {product}/>
      <Product product = {product}/>
      <Product product = {product}/>
    </div>
    </>
  )
}

export default Home