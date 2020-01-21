/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Details from '../../../shared/details';
import './vehicles-page-item.css';
import SwapiService from '../../../services/swapi-service';
import Spinner from '../../../shared/spinner';

export default function VehiclesPageList() {
  const { id } = useParams();
  const swapiService = new SwapiService();
  const [vehicles, setVehicles] = useState(null);

  function updateVehicles() {
    swapiService.getVehicles(id).then((vehiclesSevice) => {
      setVehicles(vehiclesSevice);
    });
  }

  useEffect(() => {
    if (id !== null) updateVehicles();
  }, [id]);

  if (!vehicles) {
    return <Spinner />;
  }
  return (
    <div className="col-md-6">{vehicles && <Details details={vehicles} />}</div>
  );
}
