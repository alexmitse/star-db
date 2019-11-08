/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import SwapiService from '../../services/swapi-service';

import './pagination.css';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.swapiService = new SwapiService();

    this.state = {
      pageSize: 10,
      totalCount: props.totalCount,
      currentPage: props.currentPage,
    };
  }

  onRenderPageNumber = (item) => {
    this.setState({ currentPage: item });
  };

  render() {
    const { pageSize, totalCount, currentPage } = this.state;
    const pagesCount = Math.ceil(totalCount / pageSize);
    const { onSelectNumber } = this.props;
    const pages = [];
    for (let i = 1; i <= pagesCount; i += 1) {
      pages.push(i);
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li
            className="page-item-select"
            onClick={() => {
              onSelectNumber(currentPage - 1);
              this.onRenderPageNumber(currentPage - 1);
            }}
          >
            Previous
          </li>
          <li
            className={
              currentPage === pages[0] ? 'page-item-selected' : 'page-item'
            }
            onClick={() => {
              onSelectNumber(pages[0]);
              this.onRenderPageNumber(pages[0]);
            }}
          >
            {pages[0]}
          </li>
          <li
            className={
              currentPage === pages[1] ? 'page-item-selected' : 'page-item'
            }
            onClick={() => {
              onSelectNumber(pages[1]);
              this.onRenderPageNumber(pages[1]);
            }}
          >
            {pages[1]}
          </li>
          <li
            style={
              currentPage > 3 && currentPage < pages.slice(-2)[0]
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            {currentPage > 3 && currentPage < pages.slice(-2)[0] ? '...' : null}
          </li>
          <li
            className={
              currentPage > 2 && currentPage < 8
                ? 'page-item-selected'
                : 'page-item'
            }
          >
            {currentPage > 2 && currentPage < pages.slice(-2)[0]
              ? currentPage
              : '...'}
          </li>
          <li
            style={
              currentPage > 2 && currentPage < pages.slice(-3)[0]
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            {currentPage > 2 && currentPage < pages.slice(-3)[0] ? '...' : null}
          </li>
          <li
            className={
              currentPage === pages.slice(-2)[0]
                ? 'page-item-selected'
                : 'page-item'
            }
            onClick={() => {
              onSelectNumber(pages.slice(-2)[0]);
              this.onRenderPageNumber(pages.slice(-2)[0]);
            }}
          >
            {pages.slice(-2)[0]}
          </li>
          <li
            className={
              currentPage === pages.slice(-1)[0]
                ? 'page-item-selected'
                : 'page-item'
            }
            onClick={() => {
              onSelectNumber(pages.slice(-1)[0]);
              this.onRenderPageNumber(pages.slice(-1)[0]);
            }}
          >
            {pages.slice(-1)[0]}
          </li>
          <li
            className="page-item-select"
            onClick={() => {
              onSelectNumber(currentPage + 1);
              this.onRenderPageNumber(currentPage + 1);
            }}
          >
            Next
          </li>
        </ul>
      </nav>
    );
  }
}
