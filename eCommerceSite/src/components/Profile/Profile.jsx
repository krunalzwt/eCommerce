import { useContext, useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./Profile.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ProfileEdit } from "../ProfileEdit/ProfileEdit";

export const Profile = () => {
  const { user, orderItems = [] } = useContext(ShopContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Updated User in Context:", user);
  //   console.log("Updated Order Items in Context:", orderItems);
  // }, [user, orderItems.length]);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="profile-orders">
      <div className="profile-info">
        <div className="profile-heading">
          <div className="profile-title">
            <h1>My Profile</h1>
          </div>
          <div className="edit-btn">
            <button onClick={() => navigate("/ProfileEdit")}>
              Edit Profile
            </button>
          </div>
        </div>
        <div className="profile-data">
          <p>First Name: {user?.first_name || "N/A"}</p>
          <p>Last Name: {user?.last_name || "N/A"}</p>
          <p>Email: {user?.email || "N/A"}</p>
        </div>
      </div>
      <div className="orders">
        <h2>Order History</h2>
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Status</p>
        </div>
        {orderItems.length === 0 ? (
          <p>No Order History!</p>
        ) : (
          orderItems.map((order) =>
            order.orderItems.map((item, index) => (
              <div
                key={index}
                className="cartitems-format cartitems-format-main"
              >
                <img
                  className="carticon-product-icon"
                  src={
                    item.product?.image_url
                      ? `http://localhost:8080/uploads/${item.product.image_url
                          .split("\\")
                          .pop()}`
                      : ""
                  }
                  alt={item.product?.name}
                />
                <p>{item.product?.name}</p>
                <p>&#8377;{item.price}</p>
                <button className="cartitems-quantity">{item.quantity}</button>
                <p>&#8377;{(item.price * item.quantity).toFixed(2)}</p>
                <p>{order.status}</p>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
