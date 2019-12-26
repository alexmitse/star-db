/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './search-item-list.css';
import SwapiService from '../../services/swapi-service';
import SearchList from '../search-list';
import PaginationSearch from '../pagination-search';
import Spinner from '../spinner';

export default function SearchItemList() {
  const { str } = useParams();
  const swapiService = new SwapiService();
  const [term, setTerm] = useState(null);
  const [list, setList] = useState(null);
  const [count, setCount] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);
  const [display] = useState(false);
  let searchItem;

  const onTermChange = (e) => {
    if (typeof e === 'string') {
      searchItem = e;
      setTerm(searchItem);
    } else {
      searchItem = e.target.value;
      setTerm(e.target.value);
    }

    if (searchItem.length > 1)
      swapiService.getElement(searchItem).then(([listFromServer]) => {
        setCount(listFromServer.length);
        setList(listFromServer);
      });
  };

  useEffect(() => {
    onTermChange(str);
  }, [str]);

  if (!list) return <Spinner />;

  return (
    <div>
      <input type="text" value={term} onChange={onTermChange} />
      {list && (
        <SearchList
          list={list}
          propTerm={term}
          display={display}
          currentPage={currentElement}
        />
      )}
      {list && (
        <PaginationSearch
          totalCount={count}
          currentPage={currentElement}
          setCurrentPage={setCurrentElement}
          name={list}
        />
      )}
    </div>
  );
}
