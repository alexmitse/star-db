/* eslint-disable react/prop-types */
import React from 'react';

import './vehicles-details.css';

export default function VehiclesDetails({ vehicle }) {
  const { id, name, model, manufacturer, costInCredits } = vehicle;

  return (
    <div>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
        alt="i'm so sorry"
      />
      <div className="planet-information">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">model</span>
            <span>{model}</span>
          </li>
          <li className="list-group-item">
            <span className="term">manufacturer</span>
            <span>{manufacturer}</span>
          </li>
          <li className="list-group-item">
            <span className="term">cost In Credits</span>
            <span>{costInCredits}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
