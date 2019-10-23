import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../errorIndicator';
import PeoplePage from '../people-page';

import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRandomPlanet: true,
            hasError: false,
        };

        this.toggleRandomPlanet = () => {
            this.setState(state => ({ showRandomPlanet: !state.showRandomPlanet }));
        };
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        const { hasError } = this.state;
        if (hasError) {
            return <ErrorIndicator />;
        }

        const { showRandomPlanet } = this.state;
        const planet = showRandomPlanet ? <RandomPlanet /> : null;

        return (
            <div>
                <Header />
                {planet}

                <button
                    type="button"
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}
                >
                    Toggle Random Planet
                </button>

                <PeoplePage />
            </div>
        );
    }
}
