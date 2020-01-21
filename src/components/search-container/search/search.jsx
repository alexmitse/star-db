/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './search.scss';
import SwapiService from '../../../services/swapi-service';
import SearchList from '../search-list';

export default function Search() {
  const swapiService = new SwapiService();
  const [list, setList] = useState(null);
  const [display, setDisplay] = useState(true);
  const [value, setValue] = useState(null);
  const [propTerm, setPropTerm] = useState('');
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search);
  const onBlur = (event) => {
    if (event.target.value === '') {
      setDisplay(false);
    }
  };
  const onTermChange = (event) => {
    if (event.target.value === '') {
      setDisplay(false);
    } else {
      setDisplay(true);
      setValue(event.target.value);
    }
  };
  const onSubmit = (event) => {
    setDisplay(true);
    if (value !== null) {
      setTimeout(() => {
        swapiService
          .getElement(
            value,
            parsedQuery.page === undefined ? '1' : parsedQuery.page,
          )
          .then(([listFromServer]) => {
            setList(listFromServer);
            setPropTerm(value);
          });
      }, 2000);
    }
    event.preventDefault();
  };

  useEffect(() => {
    setList(undefined);
  }, [display]);

  return (
    <div className="container-search">
      <form onSubmit={onSubmit} onBlur={onBlur} className="container-search">
        <input type="text" onInput={onTermChange} className="search-input" />
        <input type="submit" value="" className="search-submit" />
      </form>
      {list && display && (
        <SearchList
          list={list}
          display={display}
          setDisplay={setDisplay}
          propTerm={propTerm}
        />
      )}
    </div>
  );
}
