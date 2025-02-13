import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../../Context/ShopContext";
import "./CSS/Products.css";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const { fetchProducts, products,deleteProduct } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <div className="title-div">
        <h1 className="products-title">Products</h1>
        <button className="edit-button" onClick={() => navigate(`/admin/createproduct/`)}>Create Product</button>
      </div>
      <table className="products-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Category ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7">No products available.</td>
            </tr>
          ) : (
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.category_id}</td>
                <td>
                  <img
                    src={`http://localhost:8080/uploads/${item.image_url
                      .split("\\")
                      .pop()}`}
                    alt={item.name}
                  />
                </td>
                <td>{item.name}</td>
                <td>&#8377;{item.price}</td>
                <td>{item.stock}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/admin/editproducts/${item.id}`)}
                  >
                    Edit
                  </button> <br /><br />
                  <button
                    className="edit-button"
                    onClick={() => deleteProduct(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
