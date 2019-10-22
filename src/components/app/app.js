import React, {Component} from 'react';

import Header from '../header';
import PlanetDetails from '../planet-details';
import RandomPlanet from '../random-planet';
import StarshipDetails from '../starship-details';
import ErrorIndicator from '../errorIndicator';
import PeoplePage from '../people-page';


import './app.css';

export default class App extends Component {


        state = {
            showRandomPlanet: true,
            hasError: false
        };
                    
        componentDidCatch() {
            console.log('Did Catch');
            this.setState({hasError: true});
        };

        toggleRandomPlanet = () => {
            this.setState((state) => {
            return {
            showRandomPlanet: !state.showRandomPlanet }
            });
        }; 

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> : 
            null;

        return (
            <div>
                <Header />
                { planet }

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>

                <PeoplePage />

            </div>
        )
    }
}
