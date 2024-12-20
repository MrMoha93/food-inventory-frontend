import { useState } from "react";
import { getFoods } from "../services/fakeFoodService";
import Favorite from "./Favorite";

function Foods() {
  const [foods, setFoods] = useState(getFoods());

  function handleDelete(id: string) {
    const newFoods = foods.filter((food) => food._id !== id);
    setFoods(newFoods);
  }

  function handleFavor(id: string) {
    const newFoods = foods.map((food) => {
      if (food._id === id) {
        food.isFavored = !food.isFavored;
      }
      return food;
    });
    setFoods(newFoods);
  }

  if (foods.length === 0) return <p>There are no foods in the database</p>;

  return (
    <div className="container">
      <p>Showing {foods.length} foods in the database</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
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
                  onFavor={() => handleFavor(food._id)}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(food._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Foods;
