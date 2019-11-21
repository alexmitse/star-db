/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../item-list';
import Pagination from '../pagination';
import Spinner from '../spinner';
import './vehicles-page-list.css';
import SwapiService from '../../services/swapi-service';
import Search from '../search';

export default function VehiclesPageList() {
  const swapiService = new SwapiService();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get('page');

  const [vehiclesCount, setVehiclesCount] = useState(null);
  const [vehiclesList, setVehiclesList] = useState(null);
  const [currentElement, setCurrentElement] = useState(1);
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    swapiService
      .getAllVehicles(
        `${+page > 9 && +page < 1 && !(currentElement === +page) ? '' : page} `,
        null,
      )
      .then(([vehiclesListFromServer, vehiclesCountFromServer]) => {
        setVehiclesCount(vehiclesCountFromServer);
        setVehiclesList(vehiclesListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1 || currentElement === element)) {
      swapiService
        .getAllVehicles(`${element}`, `${display !== null ? display : null}`)
        .then(([vehiclesListFromServer]) => {
          setVehiclesList(vehiclesListFromServer);
          setCurrentElement(element);
        });
    }
  };

  if (!vehiclesList) {
    return <Spinner />;
  }
  return (
    <div className="vehicles-page">
      <Search
        category="vehicles"
        setList={setVehiclesList}
        setCount={setVehiclesCount}
        setDisplay={setDisplay}
      />
      <ItemList list={vehiclesList} lable="vehicles" />
      <Pagination
        totalCount={vehiclesCount}
        currentPage={page !== ':page' ? page : currentElement}
        setCurrentPage={onChangeCurrentElement}
        name="vehicles"
      />
    </div>
  );
}
