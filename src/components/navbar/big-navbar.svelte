<script>
  import { link } from "svelte-routing";
  import links from "../../constants/links";
  // components
  import CartButton from "../cart/cart-button.svelte";
  import LoginLink from "../login-link.svelte";
</script>

<nav class="navbar">
  <div class="nav-center">
    <ul class="nav-links">
      {#each links as navLink}
        <li>
          <a href={navLink.url} use:link>{navLink.text}</a>
        </li>
      {/each}
    </ul>
    <a href="/" use:link class="nav-logo big-logo">
      <img src="/assets/images/logo.svg" class="logo" alt="logo" />
    </a>
    <div class="nav-aside">
      <LoginLink />
      <CartButton />
    </div>
  </div>
</nav>
