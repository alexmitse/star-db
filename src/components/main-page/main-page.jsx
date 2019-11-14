import React, { Component } from 'react';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../errorIndicator';

import './main-page.css';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRandomPlanet: true,
      hasError: false,
    };

    this.toggleRandomPlanet = () => {
      this.setState((state) => ({ showRandomPlanet: !state.showRandomPlanet }));
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
      <div className="main-content">
        <div className="show-planet">
          {planet}
          <div className="toggle-planet">
            <button
              type="button"
              className="btn-toggle-planet"
              onClick={this.toggleRandomPlanet}
            >
              Toggle Random Planet
            </button>
          </div>
        </div>
      </div>
    );
  }
}
