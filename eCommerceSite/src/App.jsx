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
import {Profile} from './components/Profile/Profile';
import { ProfileEdit } from './components/ProfileEdit/ProfileEdit';


function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}></Route>
        <Route path='/electronics' element={<ShopCategory categoryId={2}/>}></Route>
        <Route path='/footware' element={<ShopCategory categoryId={1}/>}></Route>
        <Route path='/fashion' element={<ShopCategory categoryId={3}/>}></Route>
        <Route path='/toysandgames' element={<ShopCategory categoryId={4}/>}></Route>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}></Route>
        </Route>
        <Route path='/login' element={<LoginSignup/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path="/ProfileEdit" element={<ProfileEdit />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
