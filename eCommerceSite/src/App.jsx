import { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './components/Pages/Shop';
import { ShopCategory } from './components/Pages/ShopCategory';
import { Product } from './components/Pages/Product';
import { Cart } from './components/Pages/Cart';
import { LoginSignup } from './components/Pages/LoginSignup';
import { Footer } from './components/Footer/Footer';
import { Profile } from './components/Profile/Profile';
import { ProfileEdit } from './components/ProfileEdit/ProfileEdit';
import { Admin } from './components/Pages/admin/Admin';
import { AdminLogin } from './components/Pages/AdminLogin';
import { AdminPanel } from './components/Pages/admin/AdminPanel';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/:categoryName' element={<ShopCategory />} />
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}></Route>
        </Route>
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/AdminLogin' element={<AdminLogin />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/ProfileEdit' element={<ProfileEdit />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

