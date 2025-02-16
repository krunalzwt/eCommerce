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
    addToCart,
    removeOneItem
  } = useContext(ShopContext);

  useEffect(() => {
    fetchCart(); 
  }, []);

  const handleRemoveOne = async (item) => {
    const productId = item.product_id || (item.product ? item.product.id : undefined);

    if (!productId) {
        console.error("Invalid product data:", item);
        return;
    }
    await removeOneItem(productId);
};


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
            {item.product && (
              <>
                <img
                  className="carticon-product-icon"
                  src={`http://localhost:8080/uploads/${item.product.image_url
                    .split("\\")
                    .pop()}`}
                  alt={item.product.name}
                />
                <p>{item.product.name}</p>
                <p>&#8377;{item.product.price}</p>
                <div className="cartitems-quantity-controls">
                  <button className="addremove-btn" onClick={() => handleRemoveOne(item)} >-</button>
                  <button className="cartitems-quantity">{item.quantity}</button>
                  <button className="addremove-btn" onClick={() => addToCart(item.product_id)} >+</button>
                </div>
                <p>&#8377;{item.product.price * item.quantity}</p>
                <img
                  src={remove_icon}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to remove this item from your cart?"
                      )
                    ) {
                      removeFromCart(item.id);
                      fetchCart();
                    }
                  }}
                  alt="Remove"
                  className="carticon-remove-icon"
                />
              </>
            )}
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
                  (acc, item) => acc + (item.product?.price || 0) * item.quantity,
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
                    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
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
