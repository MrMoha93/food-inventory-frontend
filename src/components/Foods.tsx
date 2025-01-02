import { useState } from "react";
import _ from "lodash";
import { getFoods } from "../services/fakeFoodService";
import Pagination from "./Pagination";
import ListGroup from "./ListGroup";
import { Category, getCategories } from "../services/fakeCategoryService";
import { paginate } from "../utils";
import FoodsTable from "./FoodsTable";
import { SortColumn } from "../Types";

const DEFAULT_CATEGORY: Category = { _id: "", name: "All Categories" };
const DEFAULT_SORT_COLUMN: SortColumn = { path: "name", order: "asc" };
const PAGE_SIZE = 4;

function Foods() {
  const [foods, setFoods] = useState(getFoods());
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);

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

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSelectedPage(1);
  }

  if (foods.length === 0) return <p>There are no foods in the database</p>;

  const filteredFoods = selectedCategory._id
    ? foods.filter((food) => food.category._id === selectedCategory._id)
    : foods;

  const sortedFoods = _.orderBy(
    filteredFoods,
    sortColumn.path,
    sortColumn.order
  );

  const paginatedFoods = paginate(sortedFoods, PAGE_SIZE, selectedPage);

  return (
    <div className="row container">
      <div className="col-3">
        <ListGroup
          items={[DEFAULT_CATEGORY, ...getCategories()]}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
        />
      </div>
      <div className="col">
        <p>Showing {filteredFoods.length} foods in the database</p>
        <FoodsTable
          foods={paginatedFoods}
          sortColumn={sortColumn}
          onSort={setSortColumn}
          onDelete={handleDelete}
          onFavor={handleFavor}
        />
        <Pagination
          totalCount={filteredFoods.length}
          pageSize={PAGE_SIZE}
          selectedPage={selectedPage}
          onPageSelect={setSelectedPage}
        />
      </div>
    </div>
  );
}

export default Foods;
