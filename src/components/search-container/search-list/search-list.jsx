import React from 'react';
import './search-list.scss';
import { Link } from 'react-router-dom';

export default function SearchList({
  list,
  propTerm,
  display,
  setDisplay,
  currentPage,
}) {
  let click = true;
  if (!setDisplay) {
    click = false;
  }
  let count = 0;
  function renderItems(arr) {
    let arr1 = arr.filter((item) => item !== null);
    if (currentPage > 1) {
      arr1 = [...arr.slice(currentPage * 10 - 10, -1), ...arr.slice(-1)];
    }

    return arr1.map(({ id, name, lable }) => {
      count += 1; // bad
      if (count > 10) return 0;
      return (
        <li
          key={count}
          className="item-li"
          onClick={() => (click ? setDisplay(false) : click)}
        >
          <Link to={`/${lable}/id=${id}`} className="list-group-item">
            {name === [] ? null : name}
          </Link>
        </li>
      );
    });
  }
  return (
    <div className="container-item-list">
      <ul className="item-list list-group">
        {renderItems(list)}
        {list && display && (
          <li onClick={() => setDisplay(false)}>
            <Link to={`/search?page=1&search=${propTerm}`} className="result">
              ALL RESULTS
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
