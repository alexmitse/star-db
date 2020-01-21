/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './pagination-search.css';

function PaginationItem({ page, label = page, onClick, currentPage, names }) {
  return (
    <Link
      to={`/search?page=${page}&search=${names}`}
      onClick={() => onClick(page)}
      className={+currentPage === +page ? 'page-item-active' : 'page-item'}
    >
      {label}
    </Link>
  );
}

export default function Pagination({
  totalCount,
  currentPage,
  setCurrentPage,
  name,
  size,
}) {
  const [pageSize] = useState(size);
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
            names={name}
          />
        </li>
      );
    });

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={+currentPage === 1 ? 'page-item-select' : 'item'}>
          <PaginationItem
            page={currentPage <= 1 ? 1 : currentPage - 1}
            onClick={setCurrentPage}
            label="Previous"
            currentPage={currentPage}
            names={name}
          />
        </li>
        {pagesToDraw}
        <li
          className={+currentPage >= pagesCount ? 'page-item-select' : 'item'}
        >
          <PaginationItem
            page={+currentPage >= pagesCount ? pagesCount : +currentPage + 1}
            onClick={setCurrentPage}
            label="Next"
            currentPage={currentPage}
            names={name}
            pagesCount={pagesCount}
          />
        </li>
      </ul>
    </nav>
  );
}
