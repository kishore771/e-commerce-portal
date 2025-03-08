import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";

const ProductForm = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isEditing = !!productId;

  const [product, setProduct] = useState({
    name: "",
    description: "",
    store: "",
    price: "",
  });

  // Fetch product data when editing
  useEffect(() => {
    if (isEditing) {
      axios
        .get(`http://localhost:5000/products/${productId}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId, isEditing]);

  // Handle form changes
  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure price is a number
    const productData = { ...product, price: parseFloat(product.price) };

    const url = isEditing
      ? `http://localhost:5000/products/${productId}`
      : "http://localhost:5000/products";

    try {
      if (isEditing) {
        await axios.put(url, productData);
      } else {
        await axios.post(url, productData);
      }
      navigate("/products");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <label>Store:</label>
        <input
          type="text"
          name="store"
          value={product.store}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />

        <button type="submit">{isEditing ? "Update Product" : "Add Product"}</button>
      </form>
    </div>
  );
};

export default ProductForm;
