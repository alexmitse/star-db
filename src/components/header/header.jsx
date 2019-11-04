import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PeoplePage from '../people-page';
import Nav from '../nav';
import PlanetDitails from '../planet-details';
import StarshipDetails from '../starship-details';
import MainPage from '../main-page';

import './header.css';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

const Header = () => {
  return (
    <Router>
      <div className="header d-flex">
        <Nav />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/people" exact component={PeoplePage} />
          <Route path="/planet" component={PlanetDitails} />
          <Route path="/starship" component={StarshipDetails} />
          <Route path="/people/?page=:id" component={ItemList} />
          <Route path="/people/?page=:id/person:id" component={PersonDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default Header;
