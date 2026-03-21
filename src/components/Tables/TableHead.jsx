import React from "react";

import { FormSelectChip } from "Components/Forms/FormSelectChip";

export const TableHead = ({
  title,
  filters,
  handleFilterChange,
  handleDeleteFilter,
  selectedFilters,
  filterLabel,
}) => {
  return (
    <>
      <div>{title}</div>
      <FormSelectChip
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleDeleteFilter={handleDeleteFilter}
        selectedFilters={selectedFilters || []}
        filterLabel={filterLabel || ""}
      />
    </>
  );
};
