import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "./index.css";

const InvoiceDetail = () => {
  const { orderId } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/invoices?orderId=${orderId}`)
      .then(response => {
        if (response.data.length > 0) {
          setInvoice(response.data[0]); // Get the first matching invoice
        } else {
          setInvoice(null);
        }
      })
      .catch(error => console.error("Error fetching invoice:", error));
  }, [orderId]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice: ${invoice.orderId}`, 20, 20);
    doc.text(`Store: ${invoice.storeName}`, 20, 30);
    doc.text(`Date: ${invoice.date}`, 20, 40);
    doc.text(`Items:`, 20, 50);
    
    let y = 60;
    invoice.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.productName} - Qty: ${item.quantity}`, 20, y);
      doc.text(`Regular: ₹${item.regularPrice}, Deal: ₹${item.dealPrice}`, 20, y + 10);
      doc.text(`Item Total: ₹${item.itemTotal}, Tax: ₹${item.tax}`, 20, y + 20);
      y += 30;
    });

    doc.text(`Grand Total (Without Tax): ₹${invoice.grandTotalWithoutTax}`, 20, y + 10);
    doc.text(`Grand Total (With Tax): ₹${invoice.grandTotalWithTax}`, 20, y + 20);
    
    doc.save(`invoice_${invoice.orderId}.pdf`);
  };

  return (
    <div className="invoice-detail-container">
      {invoice ? (
        <>
          <h2>Invoice Detail</h2>
          <p><strong>Store:</strong> {invoice.storeName}</p>
          <p><strong>Order ID:</strong> {invoice.orderId}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
          
          <h3>Items</h3>
          {/*  Wrapper for Scrollable Table */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Regular Price</th>
                  <th>Deal Price</th>
                  <th>Item Total</th>
                  <th>Tax</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.regularPrice}</td>
                    <td>₹{item.dealPrice}</td>
                    <td>₹{item.itemTotal}</td>
                    <td>₹{item.tax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p><strong>Grand Total (Without Tax):</strong> ₹{invoice.grandTotalWithoutTax}</p>
          <p><strong>Grand Total (With Tax):</strong> ₹{invoice.grandTotalWithTax}</p>
          
          <button onClick={generatePDF} className="pdf-btn">Download PDF</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InvoiceDetail;

