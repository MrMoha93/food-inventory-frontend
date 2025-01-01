import { Food } from "../services/fakeFoodService";
import { SortColumn } from "./FoodsTable";

interface Props {
  columns: Column[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
}

interface TextColumn {
  path: string;
  label: string;
}

interface ContentColumn {
  key: string;
  content(food: Food): JSX.Element;
}

export type Column = TextColumn | ContentColumn;

function TableHeader({ onSort, sortColumn, columns }: Props) {
  function handleSort(path: string) {
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort({ ...sortColumn });
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
              {column.label}
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
