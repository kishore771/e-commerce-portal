import React from "react";
import "./StoreFilter.css";

const StoreFilter = ({ stores, selectedStore, onChange }) => {
  return (
    <div className="store-filter-container">
      <select value={selectedStore} onChange={(e) => onChange(e.target.value)}>
        <option value="">All Stores</option>
        {stores.map((store, index) => (
          <option key={index} value={store}>{store}</option>
        ))}
      </select>
    </div>
  );
};

export default StoreFilter;
