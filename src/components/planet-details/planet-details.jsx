/* eslint-disable react/prop-types */
import React from 'react';

import './planet-details.css';

export default function PlanetDetails({ planet }) {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <div>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt="i'm so sorry"
      />
      <div className="planet-information">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
