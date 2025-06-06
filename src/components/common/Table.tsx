import { Column, Id, SortColumn } from "@types";
import { TableBody, TableHeader } from "@components/common";

interface Props<T extends Id> {
  items: T[];
  columns: Column<T>[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
}

function Table<T extends Id>({ items, columns, sortColumn, onSort }: Props<T>) {
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <TableBody columns={columns} items={items} />
    </table>
  );
}

export default Table;
