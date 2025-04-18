import React, { memo } from "react";

interface TableProps {
  data: any;
  onSort?: (key: string) => void;
  sortConfig?: { key: string; direction: "asc" | "desc" } | null;
}

export const TableComponent = memo(
  ({ data, onSort, sortConfig }: TableProps) => {
    return (
      <table className="table-wrapper">
        <thead>
          <tr className="table-header">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any) => (
            <tr key={item.id} className="table-row">
              <td className="table-cell">{item.id}</td>
              <td className="table-cell">{item.name}</td>
              <td className="table-cell">{item.email}</td>
              <td className="table-cell">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);
