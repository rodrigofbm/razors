import { writable, derived } from "svelte/store";
import getProducts from "../strapi/get-products";
import { URL } from "../strapi/URL";

const store = writable([], () => {
  setProducts();
  //stop function
  return () => {};
});

async function setProducts() {
  let products = await getProducts();

  if (products) {
    products = flattenProducts(products);
    store.set(products);
  }
}

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
