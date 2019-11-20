/* eslint-disable react/prop-types */
import React from 'react';

import './species-details.css';

export default function SpeciesDetails({ specie }) {
  const { id, name, classification, designation, averageHeight } = specie;

  return (
    <div>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/species/${id}.jpg`}
        alt="i'm so sorry"
      />
      <div className="planet-information">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">classification</span>
            <span>{classification}</span>
          </li>
          <li className="list-group-item">
            <span className="term">designation</span>
            <span>{designation}</span>
          </li>
          <li className="list-group-item">
            <span className="term">average Height</span>
            <span>{averageHeight}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
