import { Food } from "../services/fakeFoodService";
import Favorite from "./Favorite";

interface Props {
  foods: Food[];
  onDelete(path: string): void;
  onFavor(path: string): void;
}

function TableBody({ foods, onDelete, onFavor }: Props) {
  return (
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
  );
}

export default TableBody;
