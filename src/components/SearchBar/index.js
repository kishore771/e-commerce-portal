import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
