import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Details from '../../../shared/details';
import './planets-page-item.css';
import SwapiService from '../../../services/swapi-service';
import Spinner from '../../../shared/spinner';

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
    <div className="col-md-6">{planets && <Details details={planets} />}</div>
  );
}
