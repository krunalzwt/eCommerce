import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

 
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/products");
      setProducts(data);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/categories");
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories.");
    }
  };

   
  const fetchCart = async () => {
    if (!token) {
      setCart([]); 
      return;
    }

    try {
      const { data, status } = await axios.get("http://localhost:8080/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched Cart:", data);
      setCart(status === 200 && Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]); 
      if (err.response?.status !== 404) {
        setError("Failed to load cart");
      }
    }
  };

   
  const addToCart = async (product_id, quantity = 1) => {
    if (!token) return alert("Please log in to add items to cart!");
    
    try {
      await axios.post(
        "http://localhost:8080/api/cart",
        { product_id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

 
  const removeFromCart = async (cartItemId) => {
    if (!token) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/cart/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

   
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/login", {
        username: email,
        password,
      });
      
      sessionStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (err) {
      setError("Invalid credentials");
      if (err.response?.status == 404) {
        alert("invalid credentials!!")
      }
      
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token"); 
    setToken(null);
    setCart([]);
  };


  // issue in place order
  const placeOrder = async () => {
    if (!token) {
      toast.error("Please log in to place an order!");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/api/orders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
      setCart([]);
    } catch (err) {
      setError("Failed to place order:");
      alert("Order failed. Please try again.");
    }
  };
  
  
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    if (token) fetchCart();
  }, [token]);

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        loading,
        error,
        login,
        addToCart,
        removeFromCart,
        token,
        fetchProducts,
        fetchCart,
        getTotalCartItems,
        placeOrder,
        logout
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
