/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable-next-line no-else-return */
import React, { useState } from 'react';
import './search-list.css';
import { Link } from 'react-router-dom';

export default function SearchList({
  list,
  propTerm,
  display,
  setDisplay,
  currentPage,
}) {
  let count = 0;
  function renderItems(arr) {
    let arr1 = arr;
    if (currentPage > 1) {
      arr1 = [...arr.slice(currentPage * 10 - 10, -1), ...arr.slice(-1)];
    }
    return arr1.map(({ id, lable, name }) => {
      count += 1; // bad
      if (count > 10) return;
      return (
        <li key={count}>
          <Link to={`/${lable}/id=${id}`} className="list-group-item">
            {name === [] ? null : name}
          </Link>
        </li>
      );
    });
  }
  return (
    <div>
      <ul className="item-list list-group">{renderItems(list)}</ul>
      {list && display && (
        <li onClick={() => setDisplay(false)}>
          <Link to={`/search=${propTerm}`}>ALL RESULTS</Link>
        </li>
      )}
    </div>
  );
}
