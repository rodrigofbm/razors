import axios from "axios";

import { URL } from "./URL";
import setupUser from "./setup-user";

const api = axios.create({
  baseURL: URL,
});

async function loginUser({ email, password }) {
  const response = await api
    .post("/auth/local", {
      identifier: email,
      password,
    })
    .catch(console.error);

  if (response) {
    setupUser(response);
  }

  return response;
}

export default loginUser;
