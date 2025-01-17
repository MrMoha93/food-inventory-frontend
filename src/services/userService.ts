import { UserRegister } from "@types";
import axios from "axios";

const API_BASEURL = "https://server.intensivecode.se/api/users";
const CREDENTIALS = "?username=mohammed&accessCode=qPwtoO";

function register(user: UserRegister) {
  return axios.post(API_BASEURL + CREDENTIALS, user);
}

export default {
  register,
};
