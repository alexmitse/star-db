/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../../../shared/item-list';
import Pagination from '../../../shared/pagination';
import Spinner from '../../../shared/spinner';
import './starships-page-list.css';
import SwapiService from '../../../services/swapi-service';

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
  const [filter] = useState(false);
  const [sizeList] = useState(10);

  useEffect(() => {
    swapiService
      .getAllStarships(
        `${
          +page > 9 || // change 9 on variable
          (+page < 1 && !(currentElement === +page)) ||
          page === null
            ? 1
            : page
        } `,
        filter,
      )
      .then(([starshipsListFromServer, starshipsCountFromServer]) => {
        setStarshipsCount(starshipsCountFromServer);
        setStarshipsList(starshipsListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1 || currentElement === element)) {
      swapiService
        .getAllStarships(`${element}`, null)
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
    <div className="starships-page">
      <ItemList list={starshipsList} lable="starships" />
      <Pagination
        totalCount={starshipsCount}
        currentPage={page !== ':page' ? page : currentElement}
        setCurrentPage={onChangeCurrentElement}
        name="starships"
        size={sizeList}
      />
    </div>
  );
}
