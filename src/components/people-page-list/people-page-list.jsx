/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../item-list';
import Pagination from '../pagination';
import Spinner from '../spinner';
import './people-page-list.css';
import SwapiService from '../../services/swapi-service';

export default function PeolpePageList() {
  console.log('hello');
  const swapiService = new SwapiService();
  const { page } = useParams();
  const [peopleCount, setPeopleCount] = useState(null);
  const [peopleList, setPeopleList] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);

  useEffect(() => {
    swapiService
      .getAllPeople(`${page === ':page' || page > 9 || page < 1 ? '' : page} `)
      .then(([peopleListFromServer, peopleCountFromServer]) => {
        setPeopleCount(peopleCountFromServer);
        setPeopleList(peopleListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1)) {
      swapiService.getAllPeople(`${element}`).then(([peopleListFromServer]) => {
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
      <ItemList list={peopleList} />
      <Pagination
        totalCount={peopleCount}
        currentPage={page !== ':page' ? page : currentElement}
        setCurrentPage={onChangeCurrentElement}
      />
    </div>
  );
}
