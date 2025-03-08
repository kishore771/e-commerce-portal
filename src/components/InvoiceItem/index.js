import React from "react";
import "./index.css";

const InvoiceItem = ({ item }) => {
  return (
    <li className="invoice-item">
      <p><strong>Item:</strong> {item.itemName}</p>
      <p><strong>Quantity:</strong> {item.quantity}</p>
      <p><strong>Regular Price:</strong> ₹{item.regularPrice}</p>
      <p><strong>Deal Price:</strong> ₹{item.dealPrice}</p>
      <p><strong>Item Total:</strong> ₹{item.itemTotal}</p>
      <p><strong>Tax:</strong> ₹{item.tax}</p>
    </li>
  );
};

export default InvoiceItem;
