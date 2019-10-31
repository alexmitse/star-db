import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-list.css';

// import { CLIENT_RENEG_LIMIT } from 'tls';

export default class ItemList extends Component {
  constructor(props) {
    super(props);

    this.swapiService = new SwapiService();

    this.state = {
      peopleList: null,
      pageSize: 10,
      totalPeopleCount: 87,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.swapiService
      .getAllPeople(`${this.state.currentPage}`)
      .then((peopleList) => {
        this.setState({ peopleList });
      });
  }

  onPageChanged = (item) => {
    this.setState({ currentPage: item });
    this.swapiService
      .getAllPeople(`${this.state.currentPage}`)
      .then((peopleList) => {
        this.setState({ peopleList });
      });
  };

  renderItems(arr) {
    // eslint-disable-next-line react/prop-types
    const { OnItemSelected } = this.props;
    return arr.map(({ id, name }) => (
      <button
        type="button"
        className="list-group-item"
        key={id}
        onClick={() => OnItemSelected(id)}
        onKeyDown={() => OnItemSelected(id)}
      >
        {name}
      </button>
    ));
  }

  render() {
    const { peopleList, pageSize, totalPeopleCount } = this.state;
    const pagesCount = Math.ceil(totalPeopleCount / pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i += 1) {
      pages.push(i);
    }

    if (!peopleList) {
      return <Spinner />;
    }

    const items = this.renderItems(peopleList);

    return (
      <div>
        <ul className="item-list list-group">{items}</ul>
        <ul>
          {pages.map((item) => {
            return (
              <botton
                onClick={() => {
                  this.onPageChanged(item);
                }}
                onKeyDown={() => {
                  this.onPageChanged(item);
                }}
              >
                {item}
              </botton>
            );
          })}
        </ul>
      </div>
    );
  }
}
