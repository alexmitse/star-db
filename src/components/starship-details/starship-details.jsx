/* eslint-disable react/prop-types */
import React from 'react';

import './starship-details.css';

export default function StarshipsDetails({ starship }) {
  const { id, name, model, manufacturer, costInCredits } = starship;

  return (
    <div>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
        alt="i'm so sorry"
      />
      <div className="planet-information">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Model</span>
            <span>{model}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Manufacture</span>
            <span>{manufacturer}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Credits</span>
            <span>{costInCredits}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
