import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import profilelogo from "../assets/profile.svg";
import cart_icon from "../assets/cart_icon.png";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, logout, token, user, fetchCategories, categories } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCategories(); 
    const path = location.pathname.split("/")[1];
    setMenu(path || "shop");
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to={user?.role === "admin" ? "/admin/adminpanel" : "/"}>
          <img src={logo} alt="" />
          <p>SHOPPER</p>
        </Link>
      </div>

      <ul className="nav-menu">
        {user?.role === "admin" ? (
          <>
            <li><Link to="/admin/products">Products</Link></li>
            <li><Link to="/admin/orders">Orders</Link></li>
            <li><Link to="/admin/categories">Categories</Link></li>
            <li><Link to="/admin/users">Users</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/electronics">Electronics</Link></li>
            <li><Link to="/footwear">Footwear</Link></li>
            <li><Link to="/fashion">Fashion</Link></li>
            <li><Link to="/toysandgames">Toys & Games</Link></li>
            
            <li className="dropdown">
              <button onClick={() => setMenu(menu === "manymore" ? "" : "manymore")} className="dropdown-btn">
                Many More <i className="fa fa-angle-down"></i>
              </button>
              {menu === "manymore" && (
                <ul className="dropdown-menu">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <li key={category.id} className="dropdown-item">
                        <Link to={`/${category.name}`} onClick={() => setMenu("")}>{category.name}</Link>
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item">No Categories</li>
                  )}
                </ul>
              )}
            </li>
          </>
        )}
      </ul>

      <div className="nav-login-cart">
        {token ? (
          <div className="profile">
            <Link to={user?.role === "admin" ? "/admin/profile" : "/profile"}>
              <img src={profilelogo} alt="Profile" className="profile-logo"/>
            </Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
        {user?.role !== "admin" && (
          <>
            <Link to="/cart">
              <img src={cart_icon} alt="Cart" />
            </Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </>
        )}
      </div>
    </div>
  );
};
