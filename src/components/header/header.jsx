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
        <div className="header-nav">
          <Nav />
        </div>
        <Switch>
          <div className="header-main-page">
            <Route path="/" exact component={MainPage} />
          </div>
          <div className="header-components">
            <Route path="/people/:page" component={PeoplePageList} />
            <Route path="/planet" component={PlanetDitails} />
            <Route path="/starship" component={StarshipDetails} />
            <Route path="/person/:id" component={PeoplePageItem} id />
          </div>
        </Switch>
      </div>
    </Router>
  );
};

export default Header;
