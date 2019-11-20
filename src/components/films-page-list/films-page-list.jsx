/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../item-list';
import Pagination from '../pagination';
import Spinner from '../spinner';
import './films-page-list.css';
import SwapiService from '../../services/swapi-service';

export default function FilmsPageList() {
  const swapiService = new SwapiService();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get('page');

  const [filmsCount, setFilmsCount] = useState(null);
  const [filmsList, setFilmsList] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);

  useEffect(() => {
    swapiService
      .getAllFilms(
        `${+page > 9 && +page < 1 && !(currentElement === +page) ? '' : page} `,
      )
      .then(([filmsListFromServer, filmsCountFromServer]) => {
        setFilmsCount(filmsCountFromServer);
        setFilmsList(filmsListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1 || currentElement === element)) {
      swapiService.getAllFilms(`${element}`).then(([filmsListFromServer]) => {
        setFilmsList(filmsListFromServer);
        setCurrentElement(element);
      });
    }
  };

  if (!filmsList) {
    return <Spinner />;
  }
  return (
    <div className="people-page">
      <ItemList list={filmsList} lable="films" />
      <Pagination
        totalCount={filmsCount}
        currentPage={page !== ':page' ? page : currentElement}
        setCurrentPage={onChangeCurrentElement}
        name="films"
      />
    </div>
  );
}
