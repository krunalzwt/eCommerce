import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      
      console.log("Products API Response:", response.data); 
  
      const productData = Array.isArray(response.data) ? response.data : response.data.data;
      
      setProducts(productData);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    }
  };
  


  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      const categoryData = Array.isArray(response.data) ? response.data : response.data.data;
      
      setCategories(categoryData);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchProducts(), fetchCategories()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <ShopContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </ShopContext.Provider>
  );
};
