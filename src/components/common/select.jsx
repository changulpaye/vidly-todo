import React from "react";
const Select = ({ name, value, label, options, onChange, error }) => {
  return (
    <div className="form-group mt-2">
      <label htmlFor={name}>{label}</label>
      <select
        className="custom-select"
        onChange={onChange}
        name={name}
        id={name}
        value={value}
      >
        <option value=""></option>
        {options.map((o) => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger mt-1">{error}</div>}
    </div>
  );
};

export default Select;
