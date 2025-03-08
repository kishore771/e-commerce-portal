import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  // Filtering states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [startDate, endDate, searchItem, invoices]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/invoices");
      setInvoices(response.data);
      setFilteredInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const applyFilters = () => {
    let filtered = invoices;

    if (startDate) {
      filtered = filtered.filter((invoice) => new Date(invoice.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter((invoice) => new Date(invoice.date) <= new Date(endDate));
    }
    if (searchItem) {
      filtered = filtered.filter((invoice) =>
        invoice.items.some((product) => product.productName.toLowerCase().includes(searchItem.toLowerCase()))
      );
    }

    setFilteredInvoices(filtered);
  };

  return (
    <div className="invoice-container">
      <div className="invoice-list-container">
        <h2>Invoice List</h2>

        {/* 🔹 Filters */}
        <div className="filter-container">
          <div>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div>
            <label>Search Item:</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
        </div>

        {/* 🔹 Invoice List */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total (₹)</th>
                <th>Products</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.storeName}</td>
                    <td>{invoice.orderId}</td>
                    <td>{invoice.date}</td>
                    <td>₹{invoice.grandTotalWithTax}</td>
                    <td>
                      {invoice.items.map((product, index) => (
                        <span key={index}>
                          {product.productName}
                          {index < invoice.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td>
                      <Link to={`/invoice/${invoice.orderId}`} className="view-btn">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No invoices found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;

