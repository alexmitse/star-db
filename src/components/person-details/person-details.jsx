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
      <div className="image-description">
        <img
          className="item-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="character"
        />
        <div className="descripton">
          <h4 className="name">{name}</h4>
        </div>
      </div>
      <div className="item-information">
        <ul className="ul-group-information">
          <li key={gender} className="list-group-item-up">
            <span className="term">Gender</span>
            <span className="term-item">{gender}</span>
          </li>
          <li key={homeworld.id} className="list-group-item-up">
            <span className="term">homeworld</span>
            <span className="term-item list-group-item ">
              <Link to={`/planets/id=${homeworld.id}`} className="a-item">
                {`${homeworld.name}.`}
              </Link>
            </span>
          </li>
          <li key="films" className="list-group-item-up">
            <span className="term">Films</span>
            <ul className="list-group list-group-flush">
              {films.map((item) => {
                return (
                  <li key={item.id} className="list-group-item">
                    <Link to={`/films/id=${item.id}`} className="a-item">
                      {`${item.title}. `}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li key={species.name} className="list-group-item-up">
            <span className="term">Species</span>
            <span className="term-item list-group-item ">
              <Link to={`/species/id=${species.id}`} className="a-item">
                {`${species.name}`}
              </Link>
            </span>
          </li>
          <li key="vehicles" className="list-group-item-up">
            <span className="term">Vehicles</span>
            <ul className="list-group list-group-flush">
              {vehicles.map((item) => {
                return (
                  <li key={item.name} className="list-group-item">
                    <Link to={`/vehicles/id=${item.id}`} className="a-item">
                      {`${item.name}. `}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li key="starships" className="list-group-item-up">
            <span className="term">Starships</span>
            <ul className="list-group list-group-flush">
              {starships.map((item) => {
                return (
                  <li key={item.name} className="list-group-item">
                    <Link to={`/starships/id=${item.id}`} className="a-item">
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
