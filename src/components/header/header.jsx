import React from 'react';

import './header.css';

const Header = () => (
  <div className="header d-flex">
    <h3>
      <botton>
          Star DB
      </botton>
    </h3>
    <ul className="d-flex">
      <li>
        <botton>People</botton>
      </li>
      <li>
        <botton>Planets</botton>
      </li>
      <li>
        <botton>Starships</botton>
      </li>
    </ul>
  </div>
);

export default Header;
