import React, { useState } from 'react'
import './Search.css'

const Search = ({history}) => {
    const [keyword , setKeyword] = useState("")
    const searchSubmitHandler = (e)=>{
        e.preventDefault() 
        if(keyword.trim()){
            history.push(`/products/${keyword}`)
        }
        else{

            history.push('/products')

        }
    }
  return (
    <>
    <div className='mainDiv'>
    <form action="" className="searchBox" onSubmit={searchSubmitHandler}>
        <input type="text"  placeholder='Seach' onChange={(e)=>{
            setKeyword(e.target.value)
        }}/>

        <input type="submit"  value="Search" />

    </form>
    </div>
    </>
  )
}

export default Search