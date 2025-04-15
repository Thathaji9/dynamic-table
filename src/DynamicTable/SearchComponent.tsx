import React, { memo, useCallback, useMemo, useState } from "react";
import _ from "lodash";

interface SearchProps {
  data: any;
  getData: (data: any) => void;
}

export const SearchComponent = memo(({ data, getData }: SearchProps) => {
  const [searchText, setSearchText] = useState("");
  const [updatedData, setUpadtedData] = useState<any>(data || []);

  const handleRoleFilter = useCallback(
    (filterValue: string) => {
      const modifiedData = filterValue
        ? data?.filter((item: any) => item?.role === filterValue)
        : data;
      setUpadtedData(modifiedData);
      getData(modifiedData);
    },
    [setUpadtedData, data, getData]
  );

  const debouncedOnChange = useMemo(
    () =>
      _.debounce((value: string) => {
        const filteredData = value
          ? updatedData?.filter(
              (item: any) =>
                item?.name?.toLowerCase().includes(value.toLowerCase()) ||
                item?.email?.toLowerCase().includes(value.toLowerCase())
            ) || []
          : updatedData;
        getData(filteredData);
      }, 500),
    [updatedData, getData]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchText(value);
      if (value.trim() === "") {
        getData(updatedData);
      } else {
        debouncedOnChange(value);
      }
    },
    [updatedData, debouncedOnChange, getData]
  );

  return (
    <div style={{ display: "flex", columnGap: 4 }}>
      <input type="text" value={searchText} onChange={handleOnChange} placeholder="Search name or email..."/>
      <select onChange={(e) => handleRoleFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Admin">Admin</option>
        <option value="Member">Member</option>
        <option value="Guest">Guest</option>
      </select>
    </div>
  );
});
