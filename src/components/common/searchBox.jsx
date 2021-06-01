import React from "react";
const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      name="query"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
