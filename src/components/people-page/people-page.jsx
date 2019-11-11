import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './people-page.css';

export default class PeolpePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPerson: null,
    };
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {
    const { selectedPerson } = this.state;
    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList OnItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={selectedPerson} />
        </div>
      </div>
    );
  }
}
