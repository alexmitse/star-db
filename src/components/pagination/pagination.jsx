/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './pagination.css';

function PaginationItem({ page, label = page, onClick }) {
  return (
    <Link
      to={`/people/${page}`}
      onClick={() => onClick(page)}
      className="page-item"
    >
      {label}
    </Link>
  );
}

export default function Pagination({
  totalCount,
  currentPage,
  setCurrentPage,
}) {
  const [pageSize] = useState(10);
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
            onClick={setCurrentPage}
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
            onClick={setCurrentPage}
            label="Previous"
          />
        </li>
        {pagesToDraw}
        <li className="page-item-select">
          <PaginationItem
            page={+currentPage + 1}
            currentPage={currentPage}
            onClick={setCurrentPage}
            label="Next"
          />
        </li>
      </ul>
    </nav>
  );
}
