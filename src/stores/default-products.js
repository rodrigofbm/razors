import { writable, derived } from "svelte/store";
import localProductsData from "../localProducts";

const store = writable(flattenProducts([...localProductsData]));
// subscribe
// set
//update

function flattenProducts(data) {
  return data.map((item) => ({ ...item, image: item.image.url }));
}

export const featuredStore = derived(store, ($products) =>
  $products.filter((item) => item.featured === true)
);

export const getProductById = (id) =>
  derived(store, ($products) => $products.find((p) => p.id === parseInt(id)));

export default store;
