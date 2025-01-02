import { Column, SortColumn, TextColumn } from "@types";

interface Props<T> {
  columns: Column<T>[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
}

function TableHeader<T>({ onSort, sortColumn, columns }: Props<T>) {
  function handleSort(path: string) {
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort({ ...sortColumn });
  }

  function renderSortIcon(column: TextColumn) {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa-solid fa-sort-down" />;
    return <i className="fa-solid fa-sort-up" />;
  }

  return (
    <thead>
      <tr>
        {columns.map((column) =>
          "path" in column ? (
            <th
              key={column.path}
              scope="col"
              onClick={() => handleSort(column.path)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          ) : (
            <th key={column.key} />
          )
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
