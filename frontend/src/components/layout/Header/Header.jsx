import React from "react";
import {ReactNavbar} from "overlay-navbar"
import logo from "/logo.png"

const Header = ()=>{
    return <ReactNavbar
    burgerColorHover = "green"
    logo = {logo}
    logoWidth ="15vmax"
    navColor1 = "rgba(1, 50 , 32 , 1)"
    logoHoverSize = "10px"
    logoHoverColor = "#006400"
    link1Text = "Home"
    link2Text = "Product"
    link3Text = "Contact"
    link4Text = "About"
    link1Url = "/"
    link1Ur2 = "/product"
    link1Ur3 = "/contact"
    link1Ur4 = "/about"
    link1Color = "#ADD8E6"
    nav1justifyContent = "flex-end"
    nav2justifyContent = "flex-end"
    nav3justifyContent = "flex-start"
    nav4justifyContent = "flex-start"
    link1ColorHover = "green"
    link1Margin = "2vmax"
   



    
 

    />
}

export default Header