/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Search from '../search/search';

const Header = () => {
  return (
    <nav className=" navigation">
      <div className="img-star-wars-search">
        <div className="img-block">
          <Link to="/">
            <img
              src="https://media.graytvinc.com/images/810*455/Star+Wars49.jpg"
              alt="StarDB"
              width="20%"
              height="20%"
            />
          </Link>
        </div>
        <Search />
      </div>
      <div className="container-nav-links">
        <ul className="nav-links">
          <li className="li-nav-links" />
          <li className="li-nav-links">
            <Link to="/people?page=1">PEOPLE</Link>
          </li>
          <li className="li-nav-links">
            <Link to="/planets?page=1">PLANETS</Link>
          </li>
          <li className="li-nav-links">
            <Link to="/starships?page=1">STARSHIPS</Link>
          </li>
          <li className="li-nav-links">
            <Link to="/films?page=1">FILMS</Link>
          </li>
          <li className="li-nav-links">
            <Link to="/species?page=1">SPECIES</Link>
          </li>
          <li className="li-nav-links">
            <Link to="/vehicles?page=1">VEHICLES</Link>
          </li>
          <li className="li-nav-links-end" />
        </ul>
      </div>
    </nav>
  );
};

export default Header;
