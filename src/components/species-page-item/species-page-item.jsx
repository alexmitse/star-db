/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpeciesDetails from '../species-details';
import './species-page-item.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default function SpeciesPageList() {
  const { id } = useParams();
  const swapiService = new SwapiService();
  const [species, setSpecies] = useState(null);

  function updateSpecies() {
    swapiService.getSpecies(id).then((speciesSevice) => {
      setSpecies(speciesSevice);
    });
  }

  useEffect(() => {
    if (id !== null) updateSpecies();
  }, [id]);

  if (!species) {
    return <Spinner />;
  }
  return (
    <div className="col-md-6">
      {species && <SpeciesDetails specie={species} />}
    </div>
  );
}
