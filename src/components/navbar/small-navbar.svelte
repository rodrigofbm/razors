<script>
  // global store
  import { link } from "svelte-routing";
  // components
  import CartButton from "../cart/cart-button.svelte";
</script>

<nav class="navbar">
  <div class="nav-center">
    <button class="btn-sidebar-toggle">
      <i class="fas fa-bars" />
    </button>
    <a href="/" use:link class="nav-logo">
      <img src="/assets/images/logo.svg" class="logo" alt="logo" />
    </a>
    <CartButton />
  </div>
</nav>
