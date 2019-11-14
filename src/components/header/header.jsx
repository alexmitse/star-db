/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PeoplePageList from '../people-page-list';
import Nav from '../nav';
import PlanetDitails from '../planet-details';
import StarshipDetails from '../starship-details';
import MainPage from '../main-page';

import './header.css';
import PeoplePageItem from '../people-page-item';

const Header = () => {
  return (
    <Router>
      <div className="header">
        <Nav />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/people/:page" component={PeoplePageList} />
          <Route path="/planet" component={PlanetDitails} />
          <Route path="/starship" component={StarshipDetails} />
          <Route path="/person/:id" component={PeoplePageItem} id />
        </Switch>
      </div>
    </Router>
  );
};

export default Header;
