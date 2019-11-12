/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';

import './pagination.css';

function PaginationItem({ currentPage, page, onClick, label = page, id }) {
  return (
    <Link
      to={`?page=${page}&persone=${id}`}
      className={currentPage === page ? 'page-item-selected' : 'page-item'}
      onClick={() => {
        onClick(page);
      }}
    >
      {label}
    </Link>
  );
}

export default function Pagination({
  totalCount,
  currentPage,
  onSelectNumber,
  pageSize,
  id,
}) {
  const pagesCount = Math.ceil(totalCount / pageSize);

  const pagesToDraw = new Array(pagesCount)
    .fill()
    .map((_, index) => index + 1)
    .map((page) => {
      return (
        <li key={page}>
          <PaginationItem
            page={page}
            currentPage={currentPage}
            onClick={onSelectNumber}
            id={id}
          />
        </li>
      );
    });

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item-select">
          <PaginationItem
            page={currentPage - 1}
            currentPage={currentPage}
            onClick={onSelectNumber}
            label="Previous"
            id={id}
          />
        </li>
        {pagesToDraw}
        <li className="page-item-select">
          <PaginationItem
            page={+currentPage + 1}
            currentPage={currentPage}
            onClick={onSelectNumber}
            label="Next"
            id={id}
          />
        </li>
      </ul>
    </nav>
  );
}
