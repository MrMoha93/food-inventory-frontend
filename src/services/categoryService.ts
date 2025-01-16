import { Category } from "@types";
import axios from "axios";

export function getCategories() {
  return axios.get<Category[]>(
    "https://server.intensivecode.se/api/categories"
  );
}
