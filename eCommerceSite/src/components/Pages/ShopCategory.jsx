import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import "./CSS/ShopCategory.css";
import dropdownicon from "../assets/dropdown_icon.png";

export const ShopCategory = () => {
  const { categoryName } = useParams();
  const { products, loading, error, fetchProducts, categories } = useContext(ShopContext);

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
  }, [categoryName]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const category = categories.find((cat) => cat.name.toLowerCase() === categoryName.toLowerCase());
  const filteredProducts = category
    ? products.filter((product) => product.category_id === category.id)
    : [];

  return (
    <div className="shopcategory">
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length}</span> products in {categoryName}
        </p>
        <div className="shopcategory-sort">
          Sort By <img src={dropdownicon} alt="Sort" />
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.length > 0 ? (
          <ul>
            {filteredProducts.map(({ id, name, price, description, image_url, stock }) => (
              <li key={id}>
                <Link to={`/product/${id}`}>
                  <img
                    src={`http://localhost:8080/uploads/${image_url.split("\\").pop()}`}
                    alt={name}
                  />
                </Link>
                <h3>{name}</h3>
                <p>Price: &#8377;{price}</p>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>

      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};






// import React, { useContext,useEffect } from "react";
// import { Link } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";
// import "./CSS/ShopCategory.css";
// import dropdownicon from "../assets/dropdown_icon.png";

// export const ShopCategory = ({ categoryId }) => {
//   const { products, loading, error,fetchProducts } = useContext(ShopContext);

//   useEffect(() => {
//     if (!products.length) {
//       fetchProducts();
//     }
//   }, [categoryId]);

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>{error}</p>;

//   const filteredProducts =
//     products?.filter((product) => product.category_id === Number(categoryId)) ||
//     [];

//   return (
//     <div className="shopcategory">
//       <div className="shopcategory-indexSort">
//         <p>
//           <span>Showing {filteredProducts.length}</span> products in this
//           category
//         </p>
//         <div className="shopcategory-sort">
//           Sort By <img src={dropdownicon} alt="Sort" />
//         </div>
//       </div>

//       <div className="shopcategory-products">
//         {filteredProducts.length > 0 ? (
//           <ul>
//             {filteredProducts.map(
//               ({ id, name, price, description, image_url,stock }) => (
//                 <li key={id}>
                  // <Link to={`/product/${id}`}>
                  //   <img
                  //     src={`http://localhost:8080/uploads/${image_url
                  //       .split("\\")
                  //       .pop()}`}
                  //     alt={name}
                  //   />
//                     <h3>{name}</h3>
//                     <p>Price: &#8377;{price}</p>
//                     <p>{description}</p>
//                   </Link>
//                 </li>
//               )
//             )}
//           </ul>
//         ) : (
//           <p>No products found in this category.</p>
//         )}
//       </div>

//       <div className="shopcategory-loadmore">Explore More</div>
//     </div>
//   );
// };
