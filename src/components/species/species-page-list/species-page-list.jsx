/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../../../shared/item-list';
import Pagination from '../../../shared/pagination';
import Spinner from '../../../shared/spinner';
import './species-page-list.css';
import SwapiService from '../../../services/swapi-service';

export default function SpeciesPageList() {
  const swapiService = new SwapiService();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get('page');

  const [speciesCount, setSpeciesCount] = useState(null);
  const [speciesList, setSpeciesList] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);
  const [filter] = useState(false);
  const [sizeList] = useState(10);

  useEffect(() => {
    swapiService
      .getAllSpecies(
        `${
          +page > 9 || // change 9 on variable
          (+page < 1 && !(currentElement === +page)) ||
          page === null
            ? 1
            : page
        } `,
        filter,
      )
      .then(([speciesListFromServer, speciesCountFromServer]) => {
        setSpeciesCount(speciesCountFromServer);
        setSpeciesList(speciesListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1 || currentElement === element)) {
      swapiService
        .getAllSpecies(`${element}`, null)
        .then(([speciesListFromServer]) => {
          setSpeciesList(speciesListFromServer);
          setCurrentElement(element);
        });
    }
  };

  if (!speciesList) {
    return <Spinner />;
  }
  return (
    <div className="species-page">
      <ItemList list={speciesList} lable="species" />
      <Pagination
        totalCount={speciesCount}
        currentPage={page !== ':page' ? page : currentElement}
        setCurrentPage={onChangeCurrentElement}
        name="species"
        size={sizeList}
      />
    </div>
  );
}
