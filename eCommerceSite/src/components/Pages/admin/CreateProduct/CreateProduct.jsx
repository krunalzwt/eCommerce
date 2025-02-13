import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../../../Context/ShopContext";
import { useParams } from "react-router-dom";
// import "./EditProduct.css";

export const CreateProduct = () => {
    const { createProducts } = useContext(ShopContext);
    const { id } = useParams();
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [productPicture, setProductPicture] = useState(null); 
    const [category_id, setcategory_id] = useState(null); 
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category_id", category_id);
    
      if (productPicture instanceof File) {
        formData.append("productPicture", productPicture);
      }
      try {
        await createProducts(formData);
      } catch (error) {
        console.error("Product update error:", error);
      }
    };
    
    return (
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Create Product</h1>
          <form className="loginsignup-feilds" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <input
              type="number"
              placeholder="Category_id"
              value={category_id}
              onChange={(e) => setcategory_id(e.target.value)}
            />
            <input
              type="file"
              name="productPicture"
              accept="image/*"
              onChange={(e) => setProductPicture(e.target.files[0])}
            />
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    );    
};
