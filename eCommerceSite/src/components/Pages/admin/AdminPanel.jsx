import React, { useContext, useEffect } from "react";
import "./CSS/AdminPanel.css";
import axios from "axios";
import { ShopContext } from "../../../Context/ShopContext";

export const AdminPanel = () => {
  const { getTotalUsers,fetchAllUsers } = useContext(ShopContext);
  useEffect(() => {
      fetchAllUsers();
    }, []);
  return (
    <>
      <div className="site">
        <div className="site-title">
          <h1>Admin Panel</h1>
        </div>
        <div className="site-info">
          <div className="site-info-box">
            <h2>Total Users</h2>
            <p>{getTotalUsers()}</p>
          </div>
          <div className="site-info-box">
            <h2>Total Orders</h2>
            <p></p>
          </div>
          <div className="site-info-box">
            <h2>Total Categories</h2>
            <p></p>
          </div>
          <div className="site-info-box">
            <h2>Total Products</h2>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
};
