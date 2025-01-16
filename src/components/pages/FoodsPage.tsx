import { useState } from "react";
import _ from "lodash";
import { paginate } from "@utils";
import { Category, SortColumn } from "@types";
import { ListGroup, Pagination, SearchBox } from "@components/common";
import { deleteFood } from "@services";
import { FoodsTable } from "@components";
import { Link } from "react-router-dom";
import { useCategories, useFoods } from "@components/hooks";

const DEFAULT_CATEGORY: Category = { id: "", name: "All Categories" };
const DEFAULT_SORT_COLUMN: SortColumn = { path: "name", order: "asc" };
const PAGE_SIZE = 4;

function FoodsPage() {
  const [searchQuerry, setSearchQuery] = useState("");
  const categories = useCategories();
  const { foods, setFoods } = useFoods();
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);

  async function handleDelete(id: string) {
    const newFoods = foods.filter((food) => food.id !== id);
    setFoods(newFoods);
    await deleteFood(id);
  }

  function handleFavor(id: string) {
    const newFoods = foods.map((food) => {
      if (food.id === id) {
        food.isFavored = !food.isFavored;
      }
      return food;
    });
    setFoods(newFoods);
  }

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSearchQuery("");
    setSelectedPage(1);
  }

  function handleSearch(value: string) {
    setSearchQuery(value);
    setSelectedCategory(DEFAULT_CATEGORY);
  }

  if (foods.length === 0) return <p>There are no foods in the database</p>;

  let filteredFoods = foods;

  if (searchQuerry) {
    filteredFoods = foods.filter((food) =>
      food.name.toLowerCase().includes(searchQuerry.toLocaleLowerCase())
    );
  } else if (selectedCategory.id) {
    filteredFoods = foods.filter(
      (food) => food.category.id === selectedCategory.id
    );
  }

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
          items={[DEFAULT_CATEGORY, ...categories]}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
        />
      </div>
      <div className="col">
        <Link to="/foods/new" className="btn btn-primary mb-2">
          New Food
        </Link>
        <p>Showing {filteredFoods.length} foods in the database</p>
        <SearchBox value={searchQuerry} onChange={handleSearch} />
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

export default FoodsPage;
