/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

import './nav.css';

const Nav = () => {
  return (
    <nav className=" navigation">
      <div className="img-star-wars">
        <Link to="/">
          <img
            src="https://media.graytvinc.com/images/810*455/Star+Wars49.jpg"
            alt="StarDB"
            width="200px"
            height="100px"
          />
        </Link>
      </div>
      <div className="container-nav-links">
        <ul className="nav-links">
          <Link to="/people/1">
            <li>People</li>
          </Link>
          <Link to="/planet">
            <li>Planets</li>
          </Link>
          <Link to="/starship">
            <li>Starships</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
