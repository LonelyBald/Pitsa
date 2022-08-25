import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface PaginationPropsType {
  onChangePage: (id: number) => void;
}

export const Pagination = ({ onChangePage }: PaginationPropsType) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={3}
      pageCount={3}
    />
  );
};
