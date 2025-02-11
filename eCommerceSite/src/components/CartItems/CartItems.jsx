import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./CartItems.css";
import remove_icon from "../assets/cart_cross_icon.png";

export const CartItems = () => {
  const {
    fetchProducts,
    products,
    cart,
    fetchCart,
    removeFromCart,
    placeOrder,
  } = useContext(ShopContext);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cartitems-format cartitems-format-main">
            <img
              className="carticon-product-icon"
              src={`http://localhost:8080/uploads/${item.product.image_url
                .split("\\")
                .pop()}`}
              alt={item.product.name}
            />
            <p>{item.product.name}</p>
            <p>&#8377;{item.product.price}</p>
            <button className="cartitems-quantity">{item.quantity}</button>
            <p>&#8377;{item.product.price * item.quantity}</p>
            <img
              src={remove_icon}
              onClick={() => removeFromCart(item.id)}
              alt=""
              className="carticon-remove-icon"
            />
          </div>
        ))
      )}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>
                &#8377;
                {cart.reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0
                )}
              </p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Total</p>
              <p>
                <strong>
                  &#8377;
                  {cart.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                  )}
                </strong>
              </p>
            </div>
            <div className="checkout-btn">
              <button onClick={placeOrder}>ORDER NOW</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
