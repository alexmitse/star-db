/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './films-details.css';

export default function FilmsDetails({ film }) {
  const {
    id,
    name,
    director,
    species,
    people,
    planets,
    vehicles,
    starships,
  } = film;

  return (
    <div className="container-datails">
      <div className="image-description">
        <img
          className="item-image"
          src={`https://starwars-visualguide.com/assets/img/films/${id}.jpg`}
          alt="i'm so sorry"
        />
        <div className="descripton">
          <h4 className="name">{name}</h4>
        </div>
      </div>
      <div className="item-information">
        <ul className="ul-group-information">
          <li key="director" className="list-group-item-up">
            <span className="term">Director</span>
            <span className="term-item">{director}</span>
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
          <li key="people" className="list-group-item-up">
            <span className="term">people </span>
            <ul className="list-group list-group-flush">
              {people.map((item) => {
                return (
                  <li key={item.name} className="list-group-item">
                    <Link to={`/people/id=${item.id}`} className="a-item">
                      {`${item.name}. `}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li key="planets" className="list-group-item-up">
            <span className="term">planets</span>
            <ul className="list-group list-group-flush">
              {planets.map((item) => {
                return (
                  <li key={item.name} className="list-group-item">
                    <Link to={`/planets/id=${item.id}`} className="a-item">
                      {`${item.name}. `}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li key="sepcies" className="list-group-item-up">
            <span className="term">species</span>
            <ul className="list-group list-group-flush">
              {species.map((item) => {
                return (
                  <li key={item.name} className="list-group-item">
                    <Link to={`/species/id=${item.id}`} className="a-item">
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
