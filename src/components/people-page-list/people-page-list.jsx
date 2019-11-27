/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../item-list';
import Pagination from '../pagination';
import Spinner from '../spinner';
import './people-page-list.css';
import SwapiService from '../../services/swapi-service';

export default function PeolpePageList() {
  const swapiService = new SwapiService();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get('page');

  const [peopleCount, setPeopleCount] = useState(null);
  const [peopleList, setPeopleList] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);

  useEffect(() => {
    swapiService
      .getAllPeople(
        `${+page > 9 && +page < 1 && !(currentElement === +page) ? '' : page} `,
        null,
      )
      .then(([peopleListFromServer, peopleCountFromServer]) => {
        setPeopleCount(peopleCountFromServer);
        setPeopleList(peopleListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1 || currentElement === element)) {
      swapiService
        .getAllPeople(`${element}`, null)
        .then(([peopleListFromServer]) => {
          setPeopleList(peopleListFromServer);
          setCurrentElement(element);
        });
    }
  };

  if (!peopleList) {
    return <Spinner />;
  }

  return (
    <div className="people-page">
      <ItemList list={peopleList} lable="people" />
      <Pagination
        totalCount={peopleCount}
        currentPage={page === ':page' ? currentElement : page}
        setCurrentPage={onChangeCurrentElement}
        name="people"
      />
    </div>
  );
}
