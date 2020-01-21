import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../../../shared/item-list';
import Pagination from '../../../shared/pagination';
import Spinner from '../../../shared/spinner';
import './planets-page-list.css';
import SwapiService from '../../../services/swapi-service';

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
  const [filter] = useState(false);
  const [sizeList] = useState(10);

  useEffect(() => {
    swapiService
      .getAllPlanets(
        `${
          +page > 9 || // change 9 on variable
          (+page < 1 && !(currentElement === +page)) ||
          page === null
            ? 1
            : page
        } `,
        filter,
      )
      .then(([planetsListFromServer, planetsCountFromServer]) => {
        setPlanetsCount(planetsCountFromServer);
        setPlanetsList(planetsListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 7 || element < 1 || currentElement === element)) {
      swapiService
        .getAllPlanets(`${element}`, null)
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
        size={sizeList}
      />
    </div>
  );
}
