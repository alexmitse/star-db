/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../item-list';
import Pagination from '../pagination';
import Spinner from '../spinner';
import './starships-page-list.css';
import SwapiService from '../../services/swapi-service';

export default function StarshipsPageList() {
  const swapiService = new SwapiService();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get('page');

  const [starshipsCount, setStarshipsCount] = useState(null);
  const [starshipsList, setStarshipsList] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);

  useEffect(() => {
    swapiService
      .getAllStarships(
        `${+page > 9 && +page < 1 && !(currentElement === +page) ? '' : page} `,
      )
      .then(([starshipsListFromServer, starshipsCountFromServer]) => {
        setStarshipsCount(starshipsCountFromServer);
        setStarshipsList(starshipsListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1 || currentElement === element)) {
      swapiService
        .getAllStarships(`${element}`)
        .then(([starshipsListFromServer]) => {
          setStarshipsList(starshipsListFromServer);
          setCurrentElement(element);
        });
    }
  };

  if (!starshipsList) {
    return <Spinner />;
  }
  return (
    <div className="people-page">
      <ItemList list={starshipsList} lable="starships" />
      <Pagination
        totalCount={starshipsCount}
        currentPage={page !== ':page' ? page : currentElement}
        setCurrentPage={onChangeCurrentElement}
        name="starships"
      />
    </div>
  );
}
