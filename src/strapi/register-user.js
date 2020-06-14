import axios from "axios";

import { URL } from "./URL";
import setupUser from "./setup-user";

const api = axios.create({
  baseURL: URL,
});

async function registerUser({ email, password, username }) {
  const response = await api
    .post("/auth/local/register", {
      email,
      password,
      username,
    })
    .catch(console.error);

  if (response) {
    setupUser(response);
  }

  return response;
}

export default registerUser;
