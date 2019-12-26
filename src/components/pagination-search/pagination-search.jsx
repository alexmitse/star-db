/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

import './pagination-search.css';

export default function PaginationSearch({
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
        <li
          key={page}
          className={+currentPage === +page ? 'page-item-active' : 'page-item'}
          currentPage={currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </li>
      );
    });

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li
          className={+currentPage === 1 ? 'item' : 'page-item'}
          onClick={() => setCurrentPage(+currentPage - 1)}
        >
          Previous
        </li>
        {pagesToDraw}
        <li
          className={+currentPage === pagesCount ? 'item' : 'page-item'}
          onClick={() => setCurrentPage(+currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </nav>
  );
}
