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
    films,
    homeworld,
    species,
    vehicles,
    starships,
  } = persona;
  return (
    <div className="container-datails">
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt="character"
      />
      <div className="planet-information">
        <h4 className="name">{name}</h4>
        <ul className="list-group list-group-flush">
          <li key={gender} className="list-group-item">
            <span className="term">Gender</span>
            <span className="term-item">{gender}</span>
          </li>
          <li key={homeworld.id} className="list-group-item">
            <span className="term">homeworld</span>
            <span className="term-item">
              <Link to={`/planets/id=${homeworld.id}`}>
                {`${homeworld.name}.`}
              </Link>
            </span>
          </li>
          <li key="films" className="list-group-item">
            <span className="term">Films</span>
            <ul className="list-group list-group-flush">
              {films.map((item) => {
                return (
                  <li key={item.id} className="list-group-item">
                    <Link to={`/films/id=${item.id}`}>{`${item.title}. `}</Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li key={species.name} className="list-group-item">
            <span className="term">Species</span>
            <span className="term-item">
              <Link to={`/species/id=${species.id}`}>{`${species.name}`}</Link>
            </span>
          </li>
          <li key="vehicles" className="list-group-item">
            <span className="term">Vehicles</span>
            <ul className="list-group list-group-flush">
              {vehicles.map((item) => {
                return (
                  <li key={item.name} className="list-group-item">
                    <Link to={`/vehicles/id=${item.id}`}>
                      {`${item.name}. `}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li key="starships" className="list-group-item">
            <span className="term">Starships</span>
            <ul className="list-group list-group-flush">
              {starships.map((item) => {
                return (
                  <li key={item.name} className="list-group-item">
                    <Link to={`/starships/id=${item.id}`}>
                      {`${item.name}. `}
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
