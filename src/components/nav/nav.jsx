import React from 'react';
import {Link} from 'react-router-dom'

import './nav.css';

const Nav = () => {
    return (
        <nav className=" navigation">
            <Link to="/">
            <h3 className="name-db">Star DB</h3>
            </Link>
            <ul className="nav-links">
                <Link to="/people">
                <li>People</li>
                </Link>
                <Link to="/planet">
                <li>Planets</li>
                </Link>
                <Link to="/starship">
                <li>Starships</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;