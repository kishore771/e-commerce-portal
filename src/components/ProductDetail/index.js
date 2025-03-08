import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Store: {product.store}</p>
      <p>Price: ${product.price}</p>
      <Link to="/products">
        <button className="back-btn">Back to Products</button>
      </Link>
    </div>
  );
};

export default ProductDetail;
