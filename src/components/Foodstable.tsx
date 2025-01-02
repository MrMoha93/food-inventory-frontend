import {} from "../services/fakeFoodService";
import { Column, Food, SortColumn } from "../Types";
import Favorite from "./Favorite";
import Table from "./Table";

interface Props {
  foods: Food[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  onDelete(path: string): void;
  onFavor(path: string): void;
}

function FoodsTable({ foods, sortColumn, onSort, onDelete, onFavor }: Props) {
  const columns: Column<Food>[] = [
    { path: "name", label: "Name" },
    { path: "category.name", label: "Category" },
    { path: "price", label: "Price" },
    { path: "numberInStock", label: "Stock" },
    {
      key: "favorite",
      content: (food) => (
        <Favorite
          isFavored={Boolean(food.isFavored)}
          onFavor={() => onFavor(food._id)}
        />
      ),
    },
    {
      key: "delete",
      content: (food) => (
        <button className="btn btn-danger" onClick={() => onDelete(food._id)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      items={foods}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}

export default FoodsTable;
