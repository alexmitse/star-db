import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemList from '../../../shared/item-list';
import Pagination from '../../../shared/pagination';
import Spinner from '../../../shared/spinner';
import './vehicles-page-list.css';
import SwapiService from '../../../services/swapi-service';

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
  const [filter] = useState(false);
  const [sizeList] = useState(10);

  useEffect(() => {
    swapiService
      .getAllVehicles(
        `${
          +page > 9 || // change 9 on variable
          (+page < 1 && !(currentElement === +page)) ||
          page === null
            ? 1
            : page
        } `,
        filter,
      )
      .then(([vehiclesListFromServer, vehiclesCountFromServer]) => {
        setVehiclesCount(vehiclesCountFromServer);
        setVehiclesList(vehiclesListFromServer);
      });
  }, []);

  const onChangeCurrentElement = (element) => {
    if (!(element > 9 || element < 1 || currentElement === element)) {
      swapiService
        .getAllVehicles(`${element}`, null)
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
      <ItemList list={vehiclesList} lable="vehicles" />
      <Pagination
        totalCount={vehiclesCount}
        currentPage={page !== ':page' ? page : currentElement}
        setCurrentPage={onChangeCurrentElement}
        name="vehicles"
        size={sizeList}
      />
    </div>
  );
}
