import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Categories } from "./Categories";
import { Users } from "./Users";
import { Products } from "./Products";
import { Orders } from "./Orders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminPanel } from "./AdminPanel";
import { EditProduct } from "./EditProduct/EditProduct";
import { CreateProduct } from "./CreateProduct/CreateProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Admin = () => {
  const navigate = useNavigate()
  useEffect(() => {
      const role = sessionStorage.getItem("role");
      if (role !== "admin") {
        toast.error("Access denied. Only Admin Can access these routes!!.");
        navigate('/');
        return;
      }
    }, []);
  return (
    <>
      <Outlet />
      <Routes>
        <Route path="/adminpanel" element={<AdminPanel/>}/>
        <Route path="/products" element={<Products />} />
        <Route path="/editproducts/:id" element={<EditProduct />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
};
