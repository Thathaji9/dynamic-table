import React, { memo } from "react";

interface PaginationProps {
  data: any[];
  offSet: number;
  onDataChange: (page: number) => void;
  currentPage: number;
}

export const Pagination = memo(
  ({ data, offSet, onDataChange, currentPage }: PaginationProps) => {
    const totalPages = Math.ceil(data.length / offSet);

    return (
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => onDataChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`pagination-button ${currentPage === i ? "active" : ""}`}
            onClick={() => onDataChange(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={() => onDataChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    );
  }
);
