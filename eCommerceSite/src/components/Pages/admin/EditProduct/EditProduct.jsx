import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../../../Context/ShopContext";
import { useParams } from "react-router-dom";
import "./EditProduct.css";

export const EditProduct = () => {
    const { updateProducts, products } = useContext(ShopContext);
    const { id } = useParams();
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [productPicture, setProductPicture] = useState(null); // Change default to null
    
    useEffect(() => {
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setStock(product.stock);
      }
      console.log("Product ID:", id);
    }, [id, products]);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
    
      if (productPicture instanceof File) {
        formData.append("productPicture", productPicture); // Only append if it's a new file
      }
      console.log("Product ID from useParams:", id);

    
      try {
        await updateProducts(id, formData);
      } catch (error) {
        console.error("Product update error:", error);
      }
    };
    
    return (
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Edit Product</h1>
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
              type="file"
              name="productPicture"
              accept="image/*"
              onChange={(e) => setProductPicture(e.target.files[0])}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    );    
};
