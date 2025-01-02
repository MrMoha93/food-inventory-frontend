import _ from "lodash";
import { Column, Id } from "@types";

interface Props<T extends Id> {
  items: T[];
  columns: Column<T>[];
}

function TableBody<T extends Id>({ items, columns }: Props<T>) {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          {columns.map((column) =>
            "path" in column ? (
              <td key={column.path}>{_.get(item, column.path)}</td>
            ) : (
              <td key={column.key}>{column.content(item)} </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
