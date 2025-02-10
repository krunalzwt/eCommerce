import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./CSS/ShopCategory.css";
import dropdownicon from "../assets/dropdown_icon.png";

export const ShopCategory = ({ categoryId }) => {
  const { products, loading, error } = useContext(ShopContext);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const filteredProducts =
    products?.filter((product) => product.category_id === categoryId) || [];

  return (
    <div className="shopcategory">
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort By <img src={dropdownicon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.length > 0 ? (
          <ul>
            {filteredProducts.map((product) => {
              return (
                <li key={product.id}>
                  <img
                    src={`http://localhost:8080/uploads/${product.image_url
                      .split("\\")
                      .pop()}`}
                    alt={product.name}
                  />
                  <h3>{product.name}</h3>
                  <p>Price: &#8377;{product.price}</p>
                  <p>{product.description}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};
