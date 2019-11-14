/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner';
import './item-list.css';

export default function ItemList({ list, onClicky }) {
  // читать квери для передачи данных в pagination

  function renderItems(arr) {
    // eslint-disable-next-line react/prop-types
    return arr.map(({ id, name }) => (
      <li key={id}>
        <Link to={`/person/${id}`} className="list-group-item">
          {name}
        </Link>
      </li>
    ));
  }

  if (!list) {
    return <Spinner />;
  }

  return (
    <div>
      <ul className="item-list list-group">{renderItems(list)}</ul>
    </div>
  );
}
