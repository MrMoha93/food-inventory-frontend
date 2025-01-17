import { UserLogin } from "@types";
import axios from "axios";

const API_BASEURL = "https://server.intensivecode.se/api/auth";
const CREDENTIALS = "?username=mohammed&accessCode=qPwtoO";

function login(user: UserLogin) {
  return axios.post(API_BASEURL + CREDENTIALS, user);
}

export default {
  login,
};
