import _ from "lodash";
import { Column, Id } from "@types";

interface Props<T extends Id> {
  items: T[];
  columns: Column<T>[];
}

//(map i map) loopa uppifrån och ner och för varje rad loopa vänster till höger.
function TableBody<T extends Id>({ items, columns }: Props<T>) {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          {columns.map((column, index) =>
            "content" in column ? (
              <td key={`${item.id}-${index}`}>{column.content(item)}</td>
            ) : (
              <td key={`${item.id}-${column.path}`}>
                {_.get(item, column.path)}
              </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
