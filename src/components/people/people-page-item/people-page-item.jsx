/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Details from '../../../shared/details';
import './people-page-item.css';
import SwapiService from '../../../services/swapi-service';
import Spinner from '../../../shared/spinner';

export default function PeolpePageList() {
  const { id } = useParams();
  const swapiService = new SwapiService();
  const [person, setPerson] = useState(null);

  function updatePerson() {
    swapiService.getPerson(id).then((personSevice) => {
      setPerson(personSevice);
    });
  }

  useEffect(() => {
    if (id !== null) updatePerson();
  }, [id]);

  if (!person) {
    return <Spinner />;
  }
  return (
    <div className="col-md-6">{person && <Details details={person} />}</div>
  );
}
