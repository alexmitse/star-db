/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PeoplePageList from '../people-page-list';
import Nav from '../nav';
import PlanetsPageList from '../planets-page-list';
import StarshipsPageList from '../starships-page-list';
import MainPage from '../main-page';
import FilmsPageList from '../films-page-list';
import SpeciesPageList from '../species-page-list';
import VehiclesPageList from '../vehicles-page-list';
import PeoplePageItem from '../people-page-item';
import PlanetsPageItem from '../planets-page-item';
import StarshipsPageItem from '../starships-page-item';
import FilmsPageItem from '../films-page-item';
import SpeciesPageItem from '../species-page-item';
import VehiclesPageItem from '../vehicles-page-item';
import './header.css';
import Search from '../search/search';
import SearchItemList from '../search-item-list/search-item-list';

const Header = () => {
  return (
    <Router>
      <div className="header">
        <div className="header-nav">
          <Search />
          <Nav />
        </div>
        <div className="header-main-page">
          <Switch>
            <Route path="/" exact component={MainPage} />
          </Switch>
        </div>
        <div className="header-components">
          <Switch>
            <Route path="/search=:str" exact component={SearchItemList} />
            <Route path="/people" exact component={PeoplePageList} />
            <Route path="/planets" exact component={PlanetsPageList} />
            <Route path="/starships" exact component={StarshipsPageList} />
            <Route path="/films" exact component={FilmsPageList} />
            <Route path="/species" exact component={SpeciesPageList} />
            <Route path="/vehicles" exact component={VehiclesPageList} />
            <Route path="/people/id=:id" component={PeoplePageItem} />
            <Route path="/planets/id=:id" component={PlanetsPageItem} />
            <Route path="/starships/id=:id" component={StarshipsPageItem} />
            <Route path="/films/id=:id" component={FilmsPageItem} />
            <Route path="/species/id=:id" component={SpeciesPageItem} />
            <Route path="/vehicles/id=:id" component={VehiclesPageItem} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Header;
