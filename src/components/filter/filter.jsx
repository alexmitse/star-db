/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './filter.css';

export default function Filter({ setFilter }) {
  const [value, setValue] = useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    setFilter(value);
    e.preventDefault();
  };
  return (
    <div className="container-filter">
      <form onSubmit={handleSubmit}>
        <input list="sex" name="sex" onChange={handleChange} />
        <datalist id="sex">
          <option label value="male" />
          <option label value="female" />
          <option label value="n/a" />
        </datalist>
        <input type="submit" />
      </form>
    </div>
  );
}
