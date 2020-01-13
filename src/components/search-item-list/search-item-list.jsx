/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import quetyString from 'query-string';
import './search-item-list.scss';
import SwapiService from '../../services/swapi-service';
import SearchList from '../search-list';
import PaginationSearch from '../pagination-search';
import Spinner from '../spinner';

export default function SearchItemList() {
  const location = useLocation();
  const swapiService = new SwapiService();
  const [term, setTerm] = useState(null);
  const [list, setList] = useState(null);
  const [count, setCount] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);
  const history = useHistory();
  const parsedQuery = quetyString.parse(location.search);

  const onHandleSubmit = (event) => {
    if (event !== undefined) {
      setTimeout(() => {
        swapiService
          .getElement(term, parsedQuery.page)
          .then(([listFromServer, countFromServer]) => {
            setCount(countFromServer);
            setList(listFromServer);
            history.push(`/search?page=${currentElement}&search=${term}`);
          });
      }, 2000);
      event.preventDefault();
    } else {
      setTimeout(() => {
        swapiService
          .getElement(parsedQuery.search, parsedQuery.page)
          .then(([listFromServer, countFromServer]) => {
            setCount(countFromServer);
            setList(listFromServer);
          });
      }, 2000);
    }
  };
  const onTermChange = (e) => {
    setTerm(e.target.value);
  };
  useEffect(() => {
    setTerm(parsedQuery.search);
    onHandleSubmit();
  }, []);

  const onChangeCurrentElement = (element) => {
    swapiService.getElement(term, `${element}`).then(([listFromServer]) => {
      setList(listFromServer);
      setCurrentElement(element);
    });
  };

  if (!list) return <Spinner />;

  return (
    <div className="component-search-container">
      <form
        onSubmit={onHandleSubmit}
        className="container-search-component container-search"
      >
        <input type="text" onInput={onTermChange} className="search-input" />
        <input type="submit" value="" className="search-submit" />
      </form>
      {list && <SearchList list={list} propTerm={term} display={false} />}
      {list && (
        <PaginationSearch
          totalCount={count}
          currentPage={currentElement}
          setCurrentPage={onChangeCurrentElement}
          name={term === null ? parsedQuery.search : term}
          size={10}
        />
      )}
    </div>
  );
}
