<script>
  import globalStore from "../../stores/global-store";
  import cartStore, { cartTotalItems } from "../../stores/cart";
</script>

<div class="btn-cart-container">

  <button
    class="btn-cart-toggle"
    on:click={() => globalStore.toggleItem('cart', true)}>
    <i class="fas fa-cart-plus" />
  </button>
  <span class="btn-cart-items">{$cartTotalItems}</span>
</div>
