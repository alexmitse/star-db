import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header';
import PeoplePageList from '../../people/people-page-list';
import PlanetsPageList from '../../planets/planets-page-list';
import StarshipsPageList from '../../starships/starships-page-list';
import MainPage from '../main-page';
import FilmsPageList from '../../films/films-page-list';
import SpeciesPageList from '../../species/species-page-list';
import VehiclesPageList from '../../vehicles/vehicles-page-list';
import PeoplePageItem from '../../people/people-page-item';
import PlanetsPageItem from '../../planets/planets-page-item';
import StarshipsPageItem from '../../starships/starships-page-item';
import FilmsPageItem from '../../films/films-page-item';
import SpeciesPageItem from '../../species/species-page-item';
import VehiclesPageItem from '../../vehicles/vehicles-page-item';
import SearchItemList from '../../search-container/search-item-list/search-item-list';
import './app.css';

const App = () => {
  return (
    <Router>
      <div className="header">
        <div className="header-nav">
          <Header />
        </div>
        <div className="header-main-page">
          <Switch>
            <Route path="/" exact component={MainPage} />
          </Switch>
        </div>
        <div className="header-components">
          <Switch>
            <Route path="/search" exact component={SearchItemList} />
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

export default App;
