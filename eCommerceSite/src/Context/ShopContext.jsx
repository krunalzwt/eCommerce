import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utilities/axiosInstance";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [role, setRole] = useState(sessionStorage.getItem("role") || null);
  const [user, setUser] = useState(null);
  const [orderItems, setorderItems] = useState([]);
  const [allUsers, setallUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found in sessionStorage .");
        return;
      }
      const response = await axios.get(
        "http://localhost:8080/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched User Data:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.patch(
        "http://localhost:8080/api/users/profile/",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong. Please try again.");
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

  const updateProducts = async (id, updatedData) => {
    try {
      if (!id) {
        console.error("Product ID is missing!");
        return;
      }
      const role = sessionStorage.getItem("role");
      if (role !== "admin") {
        toast.error("You cannot edit products!");
        return;
      }
      const response = await axios.patch(
        `http://localhost:8080/api/products/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product updated successfully!");
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const createProducts = async (updatedData) => {
    try {
      const role = sessionStorage.getItem("role");
      if (role !== "admin") {
        toast.error("You cannot add products!");
        return;
      }
      const response = await axios.post(
        `http://localhost:8080/api/products`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Product created successfully!");
      } else {
        toast.error("Failed to create product.");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("this category does not exists!!");
      }else{
        console.error("Error creating product:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const deleteProduct = async (cartItemId) => {
    if (!token) return;
    try {
      await axios.delete(`http://localhost:8080/api/products/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Error removing from cart:", err);
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

  const addNewCategories = async (categoryData) => {
    try {
      const role = sessionStorage.getItem("role");
      if (role !== "admin") {
        toast.error("You cannot add categories!");
        return;
      }

      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/categories",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Category added successfully!");
        setCategories([...categories, response.data]);
      } else {
        toast.error("Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Something went wrong. Please try again.");
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
      if (err.response?.status !== 404 && user.role === "customer") {
        toast.error("Failed to load cart");
      }
    }
  };

  const addToCart = async (product_id, quantity = 1) => {
    if (!token) {
      toast.info("Please log in to add items to cart!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/cart",
        { product_id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Item added to the cart!");
      fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart.");
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:8080/api/cart/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("product is removed from the cart!!")
      fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const removeOneItem = async (product_id) => {
    if (!token) return;

    try {
        await axios.post(
            "http://localhost:8080/api/cartitem",
            { product_id }, 
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        toast.success("One quantity removed from the cart!");
        fetchCart();
    } catch (err) {
        console.error("Error removing item from cart:", err.response?.data || err);
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
      console.log(data.role);
      if (data.role === "admin") {
        toast.error(
          "Looks like you are an Admin!! Please login to admin panel"
        );
        return false;
      }
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);
      setToken(data.token);
      setRole(data.role);
      toast.success("Login Successful!!");
      return true;
    } catch (err) {
      toast.error("Invalid credentials");
      return false;
    }
  };

  const signup = async (first_name, last_name, email, password,role="customer") => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          first_name,
          last_name,
          email,
          password,
          role
        }
      );
      toast.success("User Created Successfully!!Login Now!!");
      return true;
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          toast.error("User with this email already exists!!");
        } else if(err.response.status===400) {
          toast.error("invalid format:remove spaces,digits or special symbols from first name");
        }
      } else {
        toast.error("No response from server. Please check your connection.");
      }
      console.log(err.response.data.message);
      return false;
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: email,
          password,
        }
      );
      console.log(data.role);
      if (data.role === "customer") {
        toast.error(
          "Looks like you are a Customer!! Please login to Customer panel"
        );
        return false;
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);
      setToken(data.token);
      setRole(data.role);
      toast.success("Login Successful!!");

      return true;
    } catch (err) {
      toast.error("Invalid credentials");
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setCart([]);
    setRole(null);
    setUser(null);
    setorderItems([]);
  };

  const placeOrder = async () => {
    if (!token) {
      toast.info("Please log in to place an order!");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/api/orders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order placed successfully!Invoice sent to your mail!");
      setCart([]);
      fetchOrderItems();
    } catch (err) {
      if (err.response?.status == 403) {
        toast.info("Stock is not available , please remove Some Items!!");
      }
    }
  };

  const fetchOrderItems = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched Order Items:", response.data);
      setorderItems(response.data);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  // Admin ContextApi
  const fetchAllUsers = async () => {
    try {
      const role = sessionStorage.getItem("role");
      if (role !== "admin") {
        toast.error("only admin can fetch all users data!!");
      }
      const response = await axios.get("http://localhost:8080/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setallUsers(response.data);
    } catch (error) {
      console.error("Error fetching all users items:", error);
    }
  };

  const getTotalUsers = () => {
    return allUsers.length;
  };

  const fetchAllOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");

      if (role !== "admin") {
        console.warn(
          "Unauthorized access attempt: Only admins can fetch orders."
        );
        return;
      }

      const response = await axios.get("http://localhost:8080/api/allorders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched Order Items:", response.data);
      setAllOrders(response.data);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  const getTotalOrders = () => {
    return allOrders.length;
  };
  const getTotalCategories = () => {
    return categories.length;
  };
  const getTotalProducts = () => {
    return products.length;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");

      if (role !== "admin") {
        console.warn(
          "Unauthorized access attempt: Only admins can update orders."
        );
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Order status updated successfully!");

        fetchAllOrders();
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
    fetchOrderItems();
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
        role,
        login,
        adminLogin,
        addToCart,
        removeFromCart,
        removeOneItem,
        token,
        fetchProducts,
        addNewCategories,
        fetchCart,
        getTotalCartItems,
        createProducts,
        getTotalUsers,
        updateOrderStatus,
        fetchCategories,
        deleteProduct,
        placeOrder,
        user,
        signup,
        setUser,
        fetchAllOrders,
        fetchUsers,
        allOrders,
        updateUserProfile,
        orderItems,
        setorderItems,
        fetchOrderItems,
        fetchAllUsers,
        allUsers,
        updateProducts,
        getTotalOrders,
        getTotalCategories,
        getTotalProducts,
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
