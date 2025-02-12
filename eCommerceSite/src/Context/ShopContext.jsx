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
  const [user, setUser] = useState(null);
  const [orderItems, setorderItems] = useState([]);


  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      console.log("Stored Token:", token); 
  
      if (!token) {
        console.error("No token found in sessionStorage.");
        return;
      }
      const response = await axios.get("http://localhost:8080/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched User Data:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
    }
  };

// issue in updating profile
  const updateUserProfile = async (updatedData) => {
    try {
      const response = await axios.patch("http://localhost:8080/api/users/profile/", updatedData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
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
      const { data, status } = await axios.get(
        "http://localhost:8080/api/cart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: email,
          password,
        }
      );

      sessionStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (err) {
      setError("Invalid credentials");
      if (err.response?.status == 404) {
        alert("invalid credentials!!");
      }
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setCart([]);
  };

  const placeOrder = async () => {
    if (!token) {
      alert("Please log in to place an order!");
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
      fetchOrderItems();
    } catch (err) {
      if (err.response?.status == 403) {
        alert("Stock is not available , please remove Some Items!!");
      }
    }
  };

  const fetchOrderItems = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/orderitem", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Fetched Order Items:", response.data); // Log response
  
      setorderItems(response.data); // Ensure it updates context state
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };
  
  
  

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    if (token) fetchCart();
  }, [token]);
  
  useEffect(() => {
    fetchUsers();
    fetchOrderItems(); // Call API on component mount
  }, []);
  

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
        user,
        fetchUsers,
        updateUserProfile,
        orderItems,
        fetchOrderItems,
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
