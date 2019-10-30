import React from 'react';
import PeoplePage from '../people-page';
import Nav from '../nav';
import PlanetDitails from '../planet-details';
import StarshipDetails from '../starship-details';
import {HashRouter, BrowserRouter as Piska, Switch, Route} from 'react-router-dom';


import './header.css';
import MainPage from '../main-page';

const Header = () => {
  return (
      <HashRouter>
    <div className="header d-flex">
      <Nav />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/people" component={PeoplePage} />
        <Route path="/planet" component={PlanetDitails} />
        <Route path="/starship" component={StarshipDetails} />
      </Switch>
    </div>
      </HashRouter>
  )
};

export default Header;
