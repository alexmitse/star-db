/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import './item-list.css';
import Pagination from '../pagination/pagination-logic';
import ListeningQuery from '../pagination';

export default function ItemList({ OnItemSelected, personId }) {
  const [peopleList, setPeopleList] = useState(null);
  const [peopleCount, setPeopleCount] = useState(null);
  const [currentListPage, setCurrentListPage] = useState(1);
  const [pageSize] = useState(10);
  const [idPerson, setIdPerson] = useState(personId);

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

  function renderItems(arr) {
    // eslint-disable-next-line react/prop-types

    return arr.map(({ id, name }) => (
      <li key={id}>
        <Link
          to={`/people?page=${currentListPage}&persone=${id}`}
          className="list-group-item"
          onClick={() => setIdPerson(id) && OnItemSelected(id)}
          onKeyDown={() => OnItemSelected(id)}
        >
          {name}
        </Link>
      </li>
    ));
  }

  if (!peopleList) {
    return <Spinner />;
  }

  return (
    <div>
      <ListeningQuery onChangedQuery={onPageChanged} />
      <ul className="item-list list-group">{renderItems(peopleList)}</ul>
      <Pagination
        totalCount={peopleCount}
        onSelectNumber={onPageChanged}
        currentPage={currentListPage}
        pageSize={pageSize}
        id={idPerson}
      />
    </div>
  );
}
