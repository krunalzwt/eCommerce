import React, { useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const [menu,setMenu]=useState('electronics');
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt=""/>
            <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu('electronics')}}><Link to='/electronics'>Electronics</Link>{menu==='electronics'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('footware')}}><Link to='/footware'>Footware</Link>{menu==='footware'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('fashion')}}><Link to='/fashion'>Fashion</Link>{menu==='fashion'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('toysandgames')}}><Link to='/toysandgames'>Toys&Games</Link>{menu==='toysandgames'?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">
                0
            </div>
        </div>
    </div>
  )
}

