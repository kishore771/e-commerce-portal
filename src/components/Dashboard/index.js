import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchInvoices();
    fetchProducts();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/invoices");
      const invoicesData = response.data;

      setInvoices(invoicesData);
      calculateTotalRevenue(invoicesData);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const calculateTotalRevenue = (invoices) => {
    if (!Array.isArray(invoices)) {
      setTotalRevenue(0);
      return;
    }

    const revenue = invoices.reduce((acc, invoice) => {
      return acc + (invoice.grandTotalWithTax ? Number(invoice.grandTotalWithTax) : 0);
    }, 0);

    setTotalRevenue(revenue);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Invoices</h2>
          <p>{invoices.length}</p>
        </div>
        <div className="card">
          <h2>Total Products</h2>
          <p>{products.length}</p>
        </div>
        <div className="card">
          <h2>Total Revenue</h2>
          <p>₹{totalRevenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
