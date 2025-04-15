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
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => onDataChange(currentPage - 1)}
          style={{ margin: "0 5px", padding: "5px 10px" }}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onDataChange(i)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === i ? "#007bff" : "#f0f0f0",
              color: currentPage === i ? "#fff" : "#000",
              border: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => onDataChange(currentPage + 1)}
          style={{ margin: "0 5px", padding: "5px 10px" }}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    );
  }
);
