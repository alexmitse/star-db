import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-list.css';
import Pagination from '../pagination/pagination';

// import { CLIENT_RENEG_LIMIT } from 'tls';

export default class ItemList extends Component {
  constructor(props) {
    super(props);

    this.swapiService = new SwapiService();

    this.state = {
      peopleList: null,
      peopleCount: null,
      currentListPage: 1,
    };
  }

  componentDidMount() {
    this.swapiService.getAllPeople(``).then(([peopleList, peopleCount]) => {
      this.setState({
        peopleList: peopleList,
        peopleCount: peopleCount,
        currentListPage: 1,
      });
    });
  }

  onPageChanged = (item) => {
    this.swapiService
      .getAllPeople(`${item}`)
      .then(([peopleList, peopleCount]) => {
        this.setState({
          peopleList: peopleList,
          peopleCount: peopleCount,
          currentListPage: item,
        });
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
    const { peopleList, peopleCount, currentListPage } = this.state;

    if (!peopleList) {
      return <Spinner />;
    }

    const items = this.renderItems(peopleList);

    return (
      <div>
        <ul className="item-list list-group">{items}</ul>
        <Pagination
          data={{
            totalCount: peopleCount,
            onSelectNumber: this.onPageChanged,
            currentPage: currentListPage,
          }}
        />
      </div>
    );
  }
}
