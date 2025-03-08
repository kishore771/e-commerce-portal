import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetail from "./components/InvoiceDetail";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/invoices" element={<PrivateRoute element={<InvoiceList />} />} />
        <Route path="/invoice/:orderId" element={<PrivateRoute element={<InvoiceDetail />} />} />
        <Route path="/products" element={<PrivateRoute element={<ProductList />} />} />
        <Route path="/product/add" element={<PrivateRoute element={<ProductForm />} />} />
        <Route path="/product/edit/:productId" element={<PrivateRoute element={<ProductForm />} />} />
      </Routes>
    </Router>
  );
}

export default App;
