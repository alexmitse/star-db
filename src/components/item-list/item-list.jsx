import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import { Link } from 'react-router-dom';
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
        peopleList: peopleList,
        peopleCount: peopleCount,
      });
    });
  }

  onPageChanged = (item) => {
    this.swapiService.getAllPeople(`${item}`).then(([peopleList]) => {
      this.setState({
        peopleList: peopleList,
        currentListPage: item,
      });
    });
    setTimeout(() => console.log(this.state.currentListPage));
  };

  renderItems(arr) {
    // eslint-disable-next-line react/prop-types
    let { OnItemSelected } = this.props;
    return arr.map(({ id, name }) => (
      <Link to={`/people/?page=${this.state.currentListPage}/${id}`}>
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
          data={{
            totalCount: peopleCount,
            onSelectNumber: this.onPageChanged,
            currentPage: currentListPage,
            link: linkOfItems,
          }}
        />
      </div>
    );
  }
}
