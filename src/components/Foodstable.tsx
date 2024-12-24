import { Food } from "../services/fakeFoodService";
import Favorite from "./Favorite";

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

interface Props {
  foods: Food[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  onDelete(path: string): void;
  onFavor(path: string): void;
}

function FoodsTable({ foods, sortColumn, onSort, onDelete, onFavor }: Props) {
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
    <table className="table">
      <thead>
        <tr>
          <th scope="col" onClick={() => handleSort("name")}>
            Name
          </th>
          <th scope="col" onClick={() => handleSort("category.name")}>
            Category
          </th>
          <th scope="col" onClick={() => handleSort("price")}>
            Price
          </th>
          <th scope="col" onClick={() => handleSort("numberInStock")}>
            Stock
          </th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {foods.map((food) => (
          <tr key={food._id}>
            <td>{food.name}</td>
            <td>{food.category.name}</td>
            <td>{food.price}</td>
            <td>{food.numberInStock}</td>
            <td>
              <Favorite
                isFavored={Boolean(food.isFavored)}
                onFavor={() => onFavor(food._id)}
              />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(food._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FoodsTable;
