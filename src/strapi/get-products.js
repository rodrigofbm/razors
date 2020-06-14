import { URL } from "./URL";

export default async () => {
  const response = await fetch(`${URL}/products`).catch(console.log);
  const products = await response.json();

  if (products.error) return null;

  return products;
};
