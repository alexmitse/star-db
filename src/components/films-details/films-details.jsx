/* eslint-disable react/prop-types */
import React from 'react';

import './films-details.css';

export default function FilmsDetails({ film }) {
  const { id, name, episodeId, openingCrawl, director } = film;

  return (
    <div>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`}
        alt="i'm so sorry"
      />
      <div className="planet-information">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Episode</span>
            <span>{episodeId}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Opening Crawl</span>
            <span>{openingCrawl}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Director</span>
            <span>{director}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
