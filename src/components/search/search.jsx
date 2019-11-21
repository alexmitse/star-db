/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import './search.css';
import SwapiService from '../../services/swapi-service';

export default function Search({ category, setList, setCount, setDisplay }) {
  const swapiService = new SwapiService();
  const [term, setTerm] = useState('');

  function onTermChange(e) {
    setTerm(e.target.value);
    setDisplay(e.target.value);
    if (e.target.value === '') {
      setDisplay('dont show');
    }
    swapiService
      .getElement(`${category}`, e.target.value)
      .then(([listFromServer, countFromServer]) => {
        setCount(countFromServer);
        setList(listFromServer);
      });
  }

  return (
    <div className="nav-search-container">
      <input
        type="text"
        className="search-input"
        placeholder="type to search"
        value={term}
        onChange={onTermChange}
      />
    </div>
  );
}
