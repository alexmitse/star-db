/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import './item-list.css';
import Pagination from '../pagination/pagination';

export default function ItemList({ OnItemSelected }) {
  const [peopleList, setPeopleList] = useState(null);
  const [peopleCount, setPeopleCount] = useState(null);
  const [currentListPage, setCurrentListPage] = useState(1);
  const [prevPage, setPrevPage] = useState(null);

  const swapiService = new SwapiService();

  useEffect(() => {
    swapiService
      .getAllPeople(``)
      .then(([peopleListFromServer, peopleCountFromServer]) => {
        setPeopleCount(peopleCountFromServer);
        setPeopleList(peopleListFromServer);
      });
  }, []);

  function onPageChanged(item) {
    const pagesCount = Math.ceil(peopleCount / 10);
    if (item > 0 && item <= pagesCount) {
      swapiService.getAllPeople(`${item}`).then(([peopleListFromServer]) => {
        setPeopleList(peopleListFromServer);
        setCurrentListPage(item);
      });
    }
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  function renderItems(arr) {
    // eslint-disable-next-line react/prop-types

    return arr.map(({ id, name }) => (
      <Link to={`/people?persone=${id}`}>
        <li
          className="list-group-item"
          key={id}
          onClick={() => OnItemSelected(id)}
          onKeyDown={() => OnItemSelected(id)}
        >
          {name}
        </li>
      </Link>
    ));
  }

  const query = useQuery();

  if (prevPage !== query.get('persone')) {
    OnItemSelected(query.get('persone'));
    setPrevPage(query.get('persone'));
  }

  if (!peopleList) {
    return <Spinner />;
  }

  return (
    <div>
      <ul className="item-list list-group">{renderItems(peopleList)}</ul>
      <Pagination
        totalCount={peopleCount}
        onSelectNumber={onPageChanged}
        currentPage={currentListPage}
      />
    </div>
  );
}
