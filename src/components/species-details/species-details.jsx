/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './species-details.css';

export default function SpeciesDetails({ specie }) {
  const { id, name, classification, language, films, people } = specie;

  return (
    <div className="container-datails">
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/species/${id}.jpg`}
        alt="i'm so sorry"
      />
      <div className="planet-information">
        <h4 className="name">{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">classification</span>
            <span className="term-item">{classification}</span>
          </li>
          <li className="list-group-item">
            <span className="term">language</span>
            <span className="term-item">{language}</span>
          </li>
          <li key="people" className="list-group-item">
            <span className="term">people </span>
            <ul className="list-group list-group-flush">
              {people.map((item) => {
                return (
                  <li key={item.name} className="list-group-item">
                    <Link to={`/people/id=${item.id}`}>{`${item.name}. `}</Link>
                  </li>
                );
              })}
            </ul>
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
        </ul>
      </div>
    </div>
  );
}
