import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Details from '../../../shared/details';
import './starships-page-item.css';
import SwapiService from '../../../services/swapi-service';
import Spinner from '../../../shared/spinner';

export default function StarshipsPageList() {
  const { id } = useParams();
  const swapiService = new SwapiService();
  const [starships, setStarships] = useState(null);

  function updateStarship() {
    swapiService.getStarship(id).then((starshipsSevice) => {
      setStarships(starshipsSevice);
    });
  }

  useEffect(() => {
    if (id !== null) updateStarship();
  }, [id]);

  if (!starships) {
    return <Spinner />;
  }
  return (
    <div className="col-md-6">
      {starships && <Details details={starships} />}
    </div>
  );
}
