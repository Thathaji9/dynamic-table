import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { SearchComponent } from "./SearchComponent";
import { TableComponent } from "./TableComponent";
import { Pagination } from "./Pagination";

const userData = Array.from({ length: 45 }, (_, i) => {
  const namePart = i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Member" : "Guest";
  return {
    id: i + 1,
    name: `${namePart} ${i + 1}`,
    email: `${namePart?.toLowerCase()}${i + 1}@example.com`,
    role: namePart,
  };
});

export const DynamicTable = memo(() => {
  const [filteredData, setFilteredData] = useState<any>(userData);
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const offset = 10;

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);  

  const getFilteredData = useCallback(
    (searchData: any) => {
      setFilteredData(searchData);
      setCurrentPage(0);
    },
    [setFilteredData, setCurrentPage]
  );

  const getPaginatedData = useCallback(
    (page: number) => {
      setCurrentPage(page);
      const startIndex = page * offset;
      const paginated = filteredData.slice(startIndex, startIndex + offset); // Slice filtered data
      setPaginatedData(paginated);
    },
    [filteredData, offset]
  );

  useEffect(() => {
    const startIndex = currentPage * offset;
    const paginated = sortedData.slice(startIndex, startIndex + offset);
    setPaginatedData(paginated);
  }, [sortedData, currentPage, offset]);  

  const handleSort = useCallback((key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);
  

  return (
    <div style={{padding: '10rem'}}>
      <SearchComponent data={userData} getData={getFilteredData} />
      <TableComponent
        data={paginatedData}
        onSort={handleSort}
        sortConfig={sortConfig}
        />
      <Pagination
        offSet={offset}
        onDataChange={getPaginatedData}
        data={filteredData}
        currentPage={currentPage}
      />
    </div>
  );
});
