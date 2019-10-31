import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';

import './pagination.css';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.swapiService = new SwapiService();

    this.state = {
      pageSize: 10,
      totalCount: props.data.totalCount,
      currentPage: props.data.currentPage,
    };
  }

  render() {
    const { pageSize, totalCount } = this.state;
    const pagesCount = Math.ceil(totalCount / pageSize);
    const { onSelectNumber, currentPage } = this.props.data;
    const pages = [];
    for (let i = 1; i <= pagesCount; i += 1) {
      pages.push(i);
    }
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {pages.map((item) => {
            return (
              <li
                className={
                  item === currentPage ? 'page-item' : 'page-item-select'
                }
                key={item}
                onClick={() => {
                  onSelectNumber(item);
                }}
                onKeyDown={() => {
                  onSelectNumber(item);
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
