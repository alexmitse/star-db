/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../item-list';
import Pagination from '../pagination';
import Spinner from '../spinner';
import './planets-page-list.css';
import SwapiService from '../../services/swapi-service';

export default function PlanetsPageList() {
  const swapiService = new SwapiService();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get('page');
  const [planetsCount, setPlanetsCount] = useState(null);
  const [planetsList, setPlanetsList] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);

  useEffect(() => {
    swapiService
      .getAllPlanets(
        `${+page > 7 && +page < 1 && !(currentElement === +page) ? '' : page} `,
      )
      .then(([planetsListFromServer, planetsCountFromServer]) => {
        setPlanetsCount(planetsCountFromServer);
        setPlanetsList(planetsListFromServer);
        console.log('hey');
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 7 || element < 1 || currentElement === element)) {
      swapiService
        .getAllPlanets(`${element}`)
        .then(([planetsListFromServer]) => {
          setPlanetsList(planetsListFromServer);
          setCurrentElement(element);
        });
    }
  };

  if (!planetsList) {
    return <Spinner />;
  }
  return (
    <div className="planets-page">
      <ItemList list={planetsList} lable="planets" />
      <Pagination
        totalCount={planetsCount}
        currentPage={page !== ':page' ? page : currentElement}
        setCurrentPage={onChangeCurrentElement}
        name="planets"
      />
    </div>
  );
}
