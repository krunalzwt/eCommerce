import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, logout, token } = useContext(ShopContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="" />
          <p>SHOPPER</p>
        </Link>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/">Shop</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("electronics");
          }}
        >
          <Link to="/electronics">Electronics</Link>
          {menu === "electronics" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("footware");
          }}
        >
          <Link to="/footware">Footware</Link>
          {menu === "footware" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("fashion");
          }}
        >
          <Link to="/fashion">Fashion</Link>
          {menu === "fashion" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("toysandgames");
          }}
        >
          <Link to="/toysandgames">Toys&Games</Link>
          {menu === "toysandgames" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button> 
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};
