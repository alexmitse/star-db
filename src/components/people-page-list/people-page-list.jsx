/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../item-list';
import Pagination from '../pagination';

import './people-page-list.css';
import SwapiService from '../../services/swapi-service';

export default function PeolpePageList() {
  const swapiService = new SwapiService();
  let { page } = useParams();
  const [peopleCount, setPeopleCount] = useState(null);
  const [peopleList, setPeopleList] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);

  useEffect(() => {
    swapiService
      .getAllPeople(`${page !== ':page' ? page : ''}`)
      .then(([peopleListFromServer, peopleCountFromServer]) => {
        setPeopleCount(peopleCountFromServer);
        setPeopleList(peopleListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    swapiService.getAllPeople(`${element}`).then(([peopleListFromServer]) => {
      setPeopleList(peopleListFromServer);
      setCurrentElement(element);
    });
  };

  return (
    <div className="row mb2">
      <div className="col-md-6">
        <ItemList list={peopleList} />
        <Pagination
          totalCount={peopleCount}
          currentPage={page !== ':page' ? page : currentElement}
          setCurrentPage={onChangeCurrentElement}
        />
      </div>
    </div>
  );
}
