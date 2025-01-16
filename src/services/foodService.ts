import { Food } from "@/types";
import axios from "axios";

interface FoodFormData {
  id?: string;
  name: string;
  categoryId: string;
  numberInStock: number;
  price: number;
}

const API_BASEURL = "https://server.intensivecode.se/api/foods";
const CREDENTIALS = "?username=mohammed&accessCode=qPwtoO";

function foodUrl(id?: string) {
  if (id) return `${API_BASEURL}/${id}${CREDENTIALS}`;
  return `${API_BASEURL}${CREDENTIALS}`;
}

export function getFoods() {
  return axios.get<Food[]>(foodUrl());
}

export function getFood(id: string) {
  return axios.get<Food>(foodUrl(id));
}

export function saveFood(food: FoodFormData) {
  if (food.id) return axios.put<Food>(foodUrl(food.id), food);

  return axios.post<Food>(foodUrl(), food);
}

export function deleteFood(id: string) {
  return axios.delete<Food>(foodUrl(id));
}
