import React from 'react';
import { useLocation } from 'react-router-dom';
import './query-work.css';
import Filter from '../filter/filter';

export default function QueryWork({ data }) {
  let queryStr = [];
  const queryString = require('query-string');
  const parsed = queryString.parse(useLocation().search);
  function onSetObj(object) {
    Object.keys(object).forEach((item) => {
      const [objNextProperty] = Object.entries(object[item]);
      switch (item) {
        case 'checkbox':
          queryStr = Object.entries(objNextProperty[1]).filter(
            ([...keyValue]) => keyValue[1],
          );
          queryStr = queryStr.map(
            (element) => `${objNextProperty[0]}=${element[0]}`,
          );
          break;
        case 'list':
          if (Object.values(objNextProperty[1]).length === 1)
            Object.values(objNextProperty[1]).forEach((value) => {
              queryStr.push(`${objNextProperty[0]}=${value}`);
              queryStr = queryStr.filter(
                (element) => !element.includes(`${objNextProperty[0]}`)[0],
              );
            });

          break;
        case 'number':
          Object.entries(objNextProperty[1]).forEach((element) => {
            queryStr.push(`${objNextProperty[0]}${element[0]}=${element[1]}`);
          });
          queryStr = queryStr.filter(
            (element) => !element.includes(`${objNextProperty[0]}`)[0],
          );
          break;
        default:
          break;
      }
      queryStr.join('&');
      const newurl = `${window.location.protocol}
        '//'
        ${window.location.host}
        ${window.location.pathname}
        '?'
        ${queryStr.join('&')}`;

      window.history.pushState({ path: newurl }, '', newurl);
    });
  }

  return <Filter data={data} onSetObj={onSetObj} query={parsed} />;
}
