import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import {BrowserRouter , Routes,Route} from 'react-router-dom';
import { Shop } from './components/Pages/Shop';
import { ShopCategory } from './components/Pages/ShopCategory';
import { Product } from './components/Pages/Product';
import { Cart } from './components/Pages/Cart';
import { LoginSignup } from './components/Pages/LoginSignup';
import { Footer } from './components/Footer/Footer';

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}></Route>
        <Route path='/electronics' element={<ShopCategory categoryId={2}/>}></Route>
        <Route path='/footware' element={<ShopCategory categoryId={1}/>}></Route>
        <Route path='/fashion' element={<ShopCategory categoryId="fashion"/>}></Route>
        <Route path='/toysandgames' element={<ShopCategory categoryId="toysandgames"/>}></Route>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}></Route>
        </Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/login' element={<LoginSignup/>}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
