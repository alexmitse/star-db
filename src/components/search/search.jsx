/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import './search.css';
import SwapiService from '../../services/swapi-service';
import SearchList from '../search-list';

export default function Search() {
  const swapiService = new SwapiService();
  const [term, setTerm] = useState(undefined);
  const [list, setList] = useState(null);
  const [display, setDisplay] = useState(true);

  const onTermChange = (e) => {
    setTerm(e.target.value);
    if (e.target.value.length > 1)
      swapiService.getElement(e.target.value).then(([listFromServer]) => {
        setList(listFromServer);
      });
  };

  useEffect(() => {
    setTerm(undefined);
  }, [display]);

  return (
    <div className="container-search">
      <input type="text" value={term} onChange={onTermChange} />
      {list && display && (
        <SearchList
          list={list}
          display={display}
          propTerm={term}
          setDisplay={setDisplay}
        />
      )}
    </div>
  );
}
