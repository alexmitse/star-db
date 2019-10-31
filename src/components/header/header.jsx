import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PeoplePage from '../people-page';
import Nav from '../nav';
import PlanetDitails from '../planet-details';
import StarshipDetails from '../starship-details';

import './header.css';
import MainPage from '../main-page';

const Header = () => {
  return (
    <Router>
      <div className="header d-flex">
        <Nav />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/people" component={PeoplePage} />
          <Route path="/planet" component={PlanetDitails} />
          <Route path="/starship" component={StarshipDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default Header;
