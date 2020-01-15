/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './vehicles-details.css';

export default function VehiclesDetails({ vehicle }) {
  const { id, name, model, length, films, people } = vehicle;

  return (
    <div className="container-datails">
      <div className="image-description">
        <img
          className="item-image"
          src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
          alt="i'm so sorry"
        />
        <div className="descripton">
          <h4 className="name">{name}</h4>
        </div>
      </div>
      <div className="item-information">
        <ul className="ul-group-information">
          <li className="list-group-item-up">
            <span className="term">model</span>
            <span className="term-item">{model}</span>
          </li>
          <li className="list-group-item-up">
            <span className="term">length</span>
            <span className="term-item">{length}</span>
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
        </ul>
      </div>
    </div>
  );
}
