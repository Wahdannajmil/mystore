import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Cari menu..."
      className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
    />
  );
};

export default SearchBar;
