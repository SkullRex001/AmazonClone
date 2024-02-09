import './App.css'
import { BrowserRouter , Route , Routes} from 'react-router-dom';
import Header from './components/layout/Header/Header';

import { useEffect } from 'react';
import WebFont from 'webfontloader';

import Footer from "./components/layout/Footer/Footer"
import Home from "./components/Home/Home.jsx"

function App() {
  useEffect(()=>{

    WebFont.load({
      google: {
        families : ["Roboto" , "Droid Sans" , "Chilanka"]
      }
    })

  }, [])
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' Component={Home}/>
    </Routes>
    <Footer/>
    </BrowserRouter>

  )
}

export default App;
