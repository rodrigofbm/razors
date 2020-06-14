import { writable } from "svelte/store";

const globalStore = writable({
  sidebar: false,
  cart: false,
  alert: false,
  alertText: "default alert",
  alertDanger: false,
});

const store = {
  subscribe: globalStore.subscribe,
  toggleItem: (prop, value, alertText = "default", alertDanger = false) => {
    if (prop === "alert") {
      globalStore.update((storeValues) => {
        return { ...storeValues, [prop]: value, alertText, alertDanger };
      });
    } else {
      globalStore.update((storeValues) => {
        return { ...storeValues, [prop]: value };
      });
    }
  },
};

export default store;
