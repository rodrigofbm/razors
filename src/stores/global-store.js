import { writable } from "svelte/store";

const globalStore = writable({
  sidebar: false,
  cart: true,
  alert: false,
});

const store = {
  subscribe: globalStore.subscribe,
  toggleItem: (prop, value) => {
    globalStore.update((storeValues) => {
      return { ...storeValues, [prop]: value };
    });
  },
};

export default store;
