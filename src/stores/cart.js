import { writable, derived } from "svelte/store";
import localCartData from "../localCart";

const cart = writable([...localCartData]);

export const cartTotalItems = derived(cart, ($items) => {
  return $items.reduce((acc, curr) => (acc += curr.amount), 0);
});

export const cartTotalPrice = derived(cart, ($items) => {
  return $items.reduce((acc, curr) => (acc += curr.amount * curr.price), 0);
});

// local functions
const remove = (id, items) => {
  return items.filter((item) => item.id !== id);
};

const toggleAmount = (id, items, action) => {
  return items.map((item) => {
    let newAmount;

    if (action === "inc") newAmount = item.amount + 1;
    else if (action === "dec") newAmount = item.amount - 1;
    else newAmount = item.amount;

    return item.id === id ? { ...item, amount: newAmount } : { ...item };
  });
};
// global functions
export const removeItem = (id) => {
  cart.update((cartItems) => remove(id, cartItems));
};

export const increaseAmount = (id) => {
  cart.update((cartItems) => {
    return toggleAmount(id, cartItems, "inc");
  });
};

export const decreaseAmount = (id, amount) => {
  cart.update((cartItems) => {
    let cart;
    if (amount <= 1) {
      cart = remove(id, cartItems);
    } else {
      cart = toggleAmount(id, cartItems, "dec");
    }

    return [...cart];
  });
};
// localStorage

export default cart;
