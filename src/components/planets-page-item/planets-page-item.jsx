/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlanetDetails from '../planet-details';
import './planets-page-item.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default function PlanetsPageItem() {
  const { id } = useParams();
  const swapiService = new SwapiService();
  const [planets, setPlanets] = useState(null);

  function updatePlanet() {
    swapiService.getPlanet(id).then((planetsSevice) => {
      setPlanets(planetsSevice);
    });
  }

  useEffect(() => {
    if (id !== null) updatePlanet();
  }, [id]);

  if (!planets) {
    return <Spinner />;
  }
  return (
    <div className="col-md-6">
      {planets && <PlanetDetails planet={planets} />}
    </div>
  );
}
