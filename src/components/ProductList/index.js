import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      const productList = response.data;
      setProducts(productList);
      setFilteredProducts(productList);

      const uniqueStores = [...new Set(productList.map((product) => product.store))];
      setStores(uniqueStores);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = products;

    if (selectedStore) {
      filtered = filtered.filter((product) => product.store === selectedStore);
    }
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedStore, searchTerm]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-container">
    <div className="product-list-container">
      <h2>Product List</h2>

      <div className="filter-search-container">
        <div>
          <label>Filter by Store:</label>
          <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
            <option value="">All Stores</option>
            {stores.map((store, index) => (
              <option key={index} value={store}>
                {store}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Search Product:</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Link to="/product/add">
        <button className="add-btn">Add Product</button>
      </Link>

      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="product-price">₹ {product.price}</p>
              <p className="product-store">Store: {product.store}</p>
              <div className="product-actions">
                <Link to={`/product/edit/${product.id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default ProductList;





