"use client";

import { useState } from "react";
import styles from "./pagination.module.scss";

export interface PaginationProps {
  totalItems?: number;
  initialPage?: number;
  initialPerPage?: number;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

const PER_PAGE_OPTIONS = [10, 25, 50, 100];

export default function Pagination({
  totalItems = 100,
  initialPage = 1,
  initialPerPage = 100,
  onPageChange,
  onPerPageChange,
}: PaginationProps) {
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const totalPages = Math.ceil(totalItems / perPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageChange?.(newPage);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
    onPerPageChange?.(newPerPage);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (page > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (page < totalPages - 2) {
        pages.push('...');
      }
      
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <div className={styles.perPage}>
        <span>Showing</span>
        <select
          value={perPage}
          onChange={(e) => handlePerPageChange(Number(e.target.value))}
          className={styles.perPageSelect}
        >
          {PER_PAGE_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span>out of {totalItems}</span>
      </div>
      <div className={styles.pages}>
        <button
          className={styles.pageBtn}
          onClick={() => handlePageChange(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          <img src="/icons/caret-left.svg" alt="prev" />
        </button>
        {pageNumbers.map((p, idx) => (
          typeof p === 'number' ? (
            <button
              key={idx}
              onClick={() => handlePageChange(p)}
              className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ""}`}
            >
              {p}
            </button>
          ) : (
            <span key={idx} className={styles.ellipsis}>{p}</span>
          )
        ))}
        <button
          className={styles.pageBtn}
          onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          <img src="/icons/caret-right.svg" alt="next" />
        </button>
      </div>
    </div>
  );
}
