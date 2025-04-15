import React, { memo } from "react";

interface TableProps {
    data: any;
    onSort?: (key: string) => void;
    sortConfig?: { key: string; direction: "asc" | "desc" } | null;
  }  

export const TableComponent = memo(({ data, onSort, sortConfig }: TableProps) => {
  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
    >
      <thead>
        <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }} onClick={() => onSort?.("id")}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }} onClick={() => onSort?.("name")}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }} onClick={() => onSort?.("email")}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }} onClick={() => onSort?.("role")}>Role</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item: any) => (
          <tr key={item.id}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {item.id}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {item.name}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {item.email}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {item.role}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
