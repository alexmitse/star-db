/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import './item-list.css';
import Pagination from '../pagination/pagination';

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
        peopleList,
        peopleCount,
      });
    });
  }

  onPageChanged = (item) => {
    const { peopleCount } = this.state;
    const pagesCount = Math.ceil(peopleCount / 10);
    if (item > 0 && item <= pagesCount) {
      this.swapiService.getAllPeople(`${item}`).then(([peopleList]) => {
        this.setState({
          peopleList,
          currentListPage: item,
        });
      });
    }
  };

  renderItems(arr) {
    // eslint-disable-next-line react/prop-types
    const { OnItemSelected } = this.props;
    const { currentListPage } = this.state;
    return arr.map(({ id, name }) => (
      <Link to={`/people/?page=${currentListPage}/${id}`}>
        <li
          className="list-group-item"
          key={id}
          onClick={() => OnItemSelected(id)}
          onKeyDown={() => OnItemSelected(id)}
        >
          {name}
        </li>
      </Link>
    ));
  }

  render() {
    const { peopleList, peopleCount, currentListPage } = this.state;

    if (!peopleList) {
      return <Spinner />;
    }

    const linkOfItems = '/people/?page=';
    const items = this.renderItems(peopleList);

    return (
      <div>
        <ul className="item-list list-group">{items}</ul>
        <Pagination
          totalCount={peopleCount}
          onSelectNumber={this.onPageChanged}
          currentPage={currentListPage}
          link={linkOfItems}
        />
      </div>
    );
  }
}
