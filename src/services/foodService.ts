import { Food } from "@/types";
import { BASE_URL } from "@config";
import { auth } from "@services";
import axios from "axios";

interface FoodFormData {
  id?: string;
  name: string;
  categoryId: string;
  numberInStock: number;
  price: number;
  imageUrl: string;
}

const API_ENDPOINT = `${BASE_URL}/api/foods`;

function foodUrl(id?: string) {
  if (id) return `${API_ENDPOINT}/${id}`;
  return `${API_ENDPOINT}`;
}

export function getFoods() {
  return axios.get<Food[]>(foodUrl());
}

export function getFood(id: string) {
  const token = auth.getJwt();
  return axios.get<Food>(foodUrl(id), {
    headers: {
      "x-auth-token": token,
    },
  });
}

export function saveFood(food: FoodFormData) {
  const token = auth.getJwt();

  if (food.id) {
    return axios.put<Food>(foodUrl(food.id), food, {
      headers: {
        "x-auth-token": token,
      },
    });
  }

  return axios.post<Food>(foodUrl(), food, {
    headers: {
      "x-auth-token": token,
    },
  });
}

export function deleteFood(id: string) {
  const token = auth.getJwt();

  return axios.delete<Food>(foodUrl(id), {
    headers: {
      "x-auth-token": token,
    },
  });
}
