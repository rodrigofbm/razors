<script>
  // svelte
  import { afterUpdate } from "svelte";
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  // components
  import CartItem from "./cart-item.svelte";
  // stores
  import cart, { cartTotalPrice, setStorageCart } from "../../stores/cart";

  afterUpdate(() => setStorageCart($cart));
</script>

<section class="cart-items">
  <article>
    {#each $cart as cartItem, index (cartItem.id)}
      <div
        in:fly={{ delay: (index + 1) * 300, x: 100 }}
        out:fly={{ x: -100 }}
        animate:flip>
        <CartItem {...cartItem} />
      </div>
    {:else}
      <h2 class="empty-cart">is currently empty...</h2>
    {/each}
  </article>
  <h3 class="cart-total">total : ${$cartTotalPrice.toFixed(2)}</h3>
</section>
