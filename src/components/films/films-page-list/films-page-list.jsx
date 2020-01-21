import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../../../shared/item-list';
import Pagination from '../../../shared/pagination';
import Spinner from '../../../shared/spinner';
import './films-page-list.css';
import SwapiService from '../../../services/swapi-service';

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
  const [filter] = useState(false);
  const [sizeList] = useState(10);
  useEffect(() => {
    swapiService
      .getAllFilms(
        `${
          +page > 9 || // change 9 on variable
          (+page < 1 && !(currentElement === +page)) ||
          page === null
            ? 1
            : page
        } `,
        filter,
      )
      .then(([filmsListFromServer, filmsCountFromServer]) => {
        setFilmsCount(filmsCountFromServer);
        setFilmsList(filmsListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1 || currentElement === element)) {
      swapiService
        .getAllFilms(`${element}`, null)
        .then(([filmsListFromServer]) => {
          setFilmsList(filmsListFromServer);
          setCurrentElement(element);
        });
    }
  };

  if (!filmsList) {
    return <Spinner />;
  }
  return (
    <div className="films-page">
      <ItemList list={filmsList} lable="films" />
      <Pagination
        totalCount={filmsCount}
        currentPage={page !== ':page' ? page : currentElement}
        setCurrentPage={onChangeCurrentElement}
        name="films"
        size={sizeList}
      />
    </div>
  );
}
