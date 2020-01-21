import React from 'react';
import { Link } from 'react-router-dom';

import './item-list.css';

export default function ItemList({ list, lable }) {
  function renderItems(arr) {
    return arr.map(({ id, name }) => (
      <li key={id} className="item-li">
        <Link to={`/${lable}/id=${id}`} className="list-group-item">
          {name}
        </Link>
      </li>
    ));
  }

  return (
    <div className="container-item-list">
      <ul className="item-list list-group">{renderItems(list)}</ul>
    </div>
  );
}
