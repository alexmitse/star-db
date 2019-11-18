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
            height="110px"
          />
        </Link>
      </div>
      <div className="container-nav-links">
        <ul className="nav-links">
          <li className="li-nav-links">
            <Link to="/people/1">PEOPLE</Link>
          </li>
          <li className="li-nav-links">
            <Link to="/planet">PLANETS</Link>
          </li>
          <li className="li-nav-links">
            <Link to="/starship">STARSHIPS</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
