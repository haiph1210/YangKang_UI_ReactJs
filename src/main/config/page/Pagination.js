// file Pagination.js

import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({pageCount,handlePageClick}) => {
  return (
    <ReactPaginate
      className='d-flex justify-content-center mt-3 list-unstyled'
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      pageClassName='page-item'
      pageLinkClassName='page-link'
      previousClassName='page-item'
      previousLinkClassName='page-link'
      nextClassName='page-item'
      nextLinkClassName='page-link'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName='pagination'
      activeClassName='active'
    />
  );
};

export default Pagination;
