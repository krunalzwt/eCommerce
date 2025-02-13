import React from "react";
import { Outlet } from "react-router-dom";
import { Categories } from "./Categories";
import { Users } from "./Users";
import { Products } from "./Products";
import { Orders } from "./Orders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminPanel } from "./AdminPanel";
import { EditProduct } from "./EditProduct/EditProduct";

export const Admin = () => {
  return (
    <>
      <Outlet />
      <Routes>
        <Route path="/adminpanel" element={<AdminPanel/>}/>
        <Route path="/products" element={<Products />} />
        <Route path="/editproducts/:id" element={<EditProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
};
