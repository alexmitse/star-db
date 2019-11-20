/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VehiclesDetails from '../vehicles-details';
import './vehicles-page-item.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

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
    <div className="col-md-6">
      {vehicles && <VehiclesDetails vehicle={vehicles} />}
    </div>
  );
}
