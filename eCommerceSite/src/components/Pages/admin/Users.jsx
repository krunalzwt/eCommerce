import React, { useContext, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../../../Context/ShopContext";

export const Users = () => {
  const { fetchAllUsers, allUsers } = useContext(ShopContext);
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="cartitems">
      <div className="title">
        <h1>Users Data</h1>
      </div>
      <div className="cartitems-format-main">
        <p>User Id</p>
        <p>First Name</p>
        <p>Last Name</p>
        <p>Email</p>
      </div>
      {allUsers.length === 0 ? (
        <p>There is no users to show! </p>
      ) : (
        allUsers.map((item) => (
          <div key={item.id} className="cartitems-format cartitems-format-main">
            <p>{item.id}</p>
            <p>{item.first_name}</p>
            <p>{item.last_name}</p>
            <p>{item.email}</p>
          </div>
        ))
      )}
    </div>
  );
};
