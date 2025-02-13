import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import profilelogo from "../assets/profile.svg";
import cart_icon from "../assets/cart_icon.png";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, logout, token, user } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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
            <li onClick={() => setMenu("products")}>
              <Link to="/admin/products">Products</Link>
              {menu === "products" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("orders")}>
              <Link to="/admin/orders">Orders</Link>
              {menu === "orders" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("categories")}>
              <Link to="/admin/categories">Categories</Link>
              {menu === "categories" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("users")}>
              <Link to="/admin/users">Users</Link>
              {menu === "users" ? <hr /> : null}
            </li>
          </>
        ) : (
          <>
            <li onClick={() => setMenu("shop")}>
              <Link to="/">Shop</Link>
              {menu === "shop" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("electronics")}>
              <Link to="/electronics">Electronics</Link>
              {menu === "electronics" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("footware")}>
              <Link to="/footware">Footwear</Link>
              {menu === "footware" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("fashion")}>
              <Link to="/fashion">Fashion</Link>
              {menu === "fashion" ? <hr /> : null}
            </li>
            <li onClick={() => setMenu("toysandgames")}>
              <Link to="/toysandgames">Toys & Games</Link>
              {menu === "toysandgames" ? <hr /> : null}
            </li>
          </>
        )}
      </ul>

      <div className="nav-login-cart">
        {token ? (
          <div className="profile">
            <div className="profile-icon" onClick={() => setMenu("")}>
              <Link to={user?.role === "admin" ? "/admin/profile" : "/profile"}>
                <img src={profilelogo} alt="Profile" />
              </Link>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}

        {user?.role !== "admin" && (
          <Link to="/cart">
            <img src={cart_icon} alt="Cart" />
          </Link>
        )}
        {user?.role !== "admin" && <div className="nav-cart-count">{getTotalCartItems()}</div>}
      </div>
    </div>
  );
};
