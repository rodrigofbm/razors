import { writable, derived } from "svelte/store";

const cart = writable(getStorageCart());

export const cartTotalItems = derived(cart, ($items) => {
  return $items.reduce((acc, curr) => (acc += curr.amount), 0);
});

export const cartTotalPrice = derived(cart, ($items) => {
  let total = $items.reduce(
    (acc, curr) => (acc += curr.amount * curr.price),
    0
  );
  total = parseFloat(total.toFixed(2));

  return total;
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

    if (amount <= 1) cart = remove(id, cartItems);
    else cart = toggleAmount(id, cartItems, "dec");

    return cart;
  });
};

export const addToCart = (product) => {
  cart.update((cartItems) => {
    const { id } = product;
    const item = cartItems.find((item) => item.id === id);
    let cart;

    if (item) {
      cart = toggleAmount(id, cartItems, "inc");
    } else {
      let newItem = { ...product, amount: 1 };
      cart = [newItem, ...cartItems];
    }

    return cart;
  });
};

// localStorage
function getStorageCart() {
  const cart = localStorage.getItem("cart");

  return cart ? JSON.parse(cart) : [];
}

export function setStorageCart(cartValue) {
  localStorage.setItem("cart", JSON.stringify(cartValue));
}

export default cart;
