import axios from "axios";

import { URL } from "./URL";

const api = axios.create({
  baseURL: URL,
});

async function submitOrder({ name, total, items, stripeTokenId, userToken }) {
  // code goes here
  const response = await api
    .post(
      "/orders",
      {
        name,
        total,
        items,
        stripeTokenId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    .catch(console.error);

  return response;
}

export default submitOrder;
