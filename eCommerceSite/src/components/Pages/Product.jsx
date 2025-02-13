import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import "./CSS/Product.css";

export const Product = () => {
  const { products, loading, error, fetchProducts, addToCart } = useContext(ShopContext);
  const { productId } = useParams();

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
  }, []);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={`http://localhost:8080/uploads/${product.image_url.split("\\").pop()}`}
            alt={product.name}
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">Price: &#8377;{product.price}</div>
        <div className="stock">Available Stock: {product.stock}</div>
        <div className="productdisplay-right-description">{product.description}</div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
      </div>
    </div>
  );
};
