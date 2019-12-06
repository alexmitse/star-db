import React from 'react';

import './query-work.css';
import Filter from '../filter/filter';

export default function QueryWork({ data }) {
  function onSetObj(object) {
    console.log(object); // should parse in query string using URLQueryParams()
  }

  return <Filter data={data} onSetObj={onSetObj} />;
}
