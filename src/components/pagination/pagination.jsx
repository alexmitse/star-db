/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './pagination.css';

export default function Pagination({
  totalCount,
  currentPage,
  onSelectNumber,
}) {
  const [pageSize] = useState(10);
  const [totalCounts] = useState(totalCount);
  let [currentPages] = useState(currentPage);
  let [prevPage] = useState(0);

  function onRenderPageNumber(item) {
    currentPages = item;
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const pagesCount = Math.ceil(totalCounts / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  if (prevPage !== query.get('page')) {
    onSelectNumber(query.get('page'));
    onRenderPageNumber(query.get('page'));
    prevPage = query.get('page');
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <Link
          to={`/people?page=${
            currentPages === pages[0] ? currentPages - 1 : currentPages
          }`}
        >
          <li
            className="page-item-select"
            onClick={() => {
              onSelectNumber(
                currentPages === pages[0] ? currentPages : currentPages - 1,
              );
              onRenderPageNumber(
                currentPages === pages[0] ? currentPages : currentPages - 1,
              );
            }}
          >
            Previous
          </li>
        </Link>
        <Link to={`/people?page=${pages[0]}`}>
          <li
            className={
              currentPages === pages[0] ? 'page-item-selected' : 'page-item'
            }
            onClick={() => {
              onSelectNumber(pages[0]);
              onRenderPageNumber(pages[0]);
            }}
          >
            {pages[0]}
          </li>
        </Link>
        <Link to={`/people?page=${pages[1]}`}>
          <li
            className={
              currentPages === pages[1] ? 'page-item-selected' : 'page-item'
            }
            onClick={() => {
              onSelectNumber(pages[1]);
              onRenderPageNumber(pages[1]);
            }}
          >
            {pages[1]}
          </li>
        </Link>
        <li
          className="page-item"
          style={
            currentPages > 3 && currentPages < pages.slice(-2)[0]
              ? { display: 'flex' }
              : { display: 'none' }
          }
        >
          {currentPages > 3 && currentPages < pages.slice(-2)[0] ? '...' : null}
        </li>
        <Link to={`/people?page=${currentPages}`}>
          <li
            className={
              currentPages > 2 && currentPages < 8
                ? 'page-item-selected'
                : 'page-item'
            }
          >
            {currentPages > 2 && currentPages < pages.slice(-2)[0]
              ? currentPages
              : '...'}
          </li>
        </Link>
        <li
          className="page-item"
          style={
            currentPages > 2 && currentPages < pages.slice(-3)[0]
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {currentPages > 2 && currentPages < pages.slice(-3)[0] ? '...' : null}
        </li>
        <Link to={`/people?page=${pages.slice(-2)[0]}`}>
          <li
            className={
              currentPages === pages.slice(-2)[0]
                ? 'page-item-selected'
                : 'page-item'
            }
            onClick={() => {
              onSelectNumber(pages.slice(-2)[0]);
              onRenderPageNumber(pages.slice(-2)[0]);
            }}
          >
            {pages.slice(-2)[0]}
          </li>
        </Link>
        <Link to={`/people?page=${pages.slice(-1)[0]}`}>
          <li
            className={
              currentPages === pages.slice(-1)[0]
                ? 'page-item-selected'
                : 'page-item'
            }
            onClick={() => {
              onSelectNumber(pages.slice(-1)[0]);
              onRenderPageNumber(pages.slice(-1)[0]);
            }}
          >
            {pages.slice(-1)[0]}
          </li>
        </Link>
        <Link
          to={`/people?page=${
            currentPages === pages.slice(-1)[0]
              ? currentPages
              : currentPages + 1
          }`}
        >
          <li
            className="page-item-select"
            onClick={() => {
              onSelectNumber(
                currentPages === pages.slice(-1)[0]
                  ? currentPages
                  : currentPages + 1,
              );
              onRenderPageNumber(
                currentPages === pages.slice(-1)[0]
                  ? currentPages
                  : currentPages + 1,
              );
            }}
          >
            Next
          </li>
        </Link>
      </ul>
    </nav>
  );
}
