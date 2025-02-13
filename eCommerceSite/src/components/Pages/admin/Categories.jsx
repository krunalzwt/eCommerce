import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../../Context/ShopContext";
import "./CSS/Products.css";

export const Categories = () => {
  const { fetchCategories, categories, addNewCategories } = useContext(ShopContext);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (categoryName.trim() === "") {
      alert("Category name cannot be empty!");
      return;
    }
    
    try {
      await addNewCategories({ name: categoryName }); 
      setCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="products-container">
      <h1 className="products-title">Categories</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="2">No categories available.</td>
            </tr>
          ) : (
            categories.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="add-category">
        <input
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button className="edit-button" type="button" onClick={handleAddCategory}>
          Add
        </button>
      </div>
    </div>
  );
};
