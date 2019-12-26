/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import './person-details.css';

export default function PersonDetails({ persona }) {
  const {
    id,
    name,
    gender,
    birthYear,
    eyeColor,
    films,
    homeworld,
    species,
    vehicles,
    starships,
  } = persona;

  return (
    <div className="person-details card">
      <img
        className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt="character"
      />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
          <li className="list-group-item">
            <span className="term">home world</span>
            <span>
              <Link to={`/planets/id=${homeworld}`}>{`home${homeworld}`}</Link>
            </span>
          </li>
          <li className="list-group-item">
            <span className="term">Films:</span>
            <ul className="list-group list-group-flush">
              {films.map((item) => {
                return (
                  <li>
                    <Link to={`/films/id=${item}`}>{` film${item}  `}</Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="list-group-item">
            <span className="term">Species</span>
            <ul className="list-group list-group-flush">
              {species.map((item) => {
                return (
                  <li>
                    <Link to={`/species/id=${item}`}>{`species${item} `}</Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="list-group-item">
            <span className="term">Vehicles</span>
            <ul className="list-group list-group-flush">
              {vehicles.map((item) => {
                return (
                  <li>
                    <Link to={`/vehicles/id=${item}`}>
                      {`vehicles${item} `}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="list-group-item">
            <span className="term">Starships</span>
            <ul className="list-group list-group-flush">
              {starships.map((item) => {
                return (
                  <li>
                    <Link to={`/starships/id=${item}`}>
                      {`starships${item} `}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
