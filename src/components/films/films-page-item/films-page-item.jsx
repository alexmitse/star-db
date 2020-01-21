/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Details from '../../../shared/details';
import './films-page-item.css';
import SwapiService from '../../../services/swapi-service';
import Spinner from '../../../shared/spinner';

export default function FilmsPageList() {
  const { id } = useParams();
  const swapiService = new SwapiService();
  const [films, setFilms] = useState(null);

  function updateFilm() {
    swapiService.getFilm(id).then((filmsSevice) => {
      setFilms(filmsSevice);
    });
  }

  useEffect(() => {
    if (id !== null) updateFilm();
  }, [id]);

  if (!films) {
    return <Spinner />;
  }
  return <div className="col-md-6">{films && <Details details={films} />}</div>;
}
