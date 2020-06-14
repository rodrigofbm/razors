<script>
  // stores
  import globalStore from "../../stores/global-store";
  import user from "../../stores/user";
  // svelte
  import { fly, fade, blur } from "svelte/transition";
  import { link } from "svelte-routing";
  // components
  import CartList from "./cart-list.svelte";
  // variables
</script>

<div class="cart-overlay" transition:blur>
  <div class="cart-container" transition:fly={{ x: 100 }}>
    <div class="cart" transition:fade={{ delay: 400 }}>
      <!-- cart header -->
      <div class="cart-header">
        <button
          class="btn-close"
          on:click={() => globalStore.toggleItem('cart', false)}>
          <i class="fas fa-window-close" />
        </button>
        <h2 class="cart-title">your bag</h2>
        <span />
        <!-- end header -->
      </div>

      <!-- cart body -->
      <CartList />
      <!-- end body -->
      <!-- cart footer -->
      <div class="cart-footer">
        {#if $user.jwt}
          <a
            class="btn btn-primary btn-block"
            href="/checkout"
            on:click={() => globalStore.toggleItem('cart', false)}
            use:link>
            checkout
          </a>
        {:else}
          <p class="cart-login">
            in order to checkout please
            <a
              href="/login"
              on:click={() => globalStore.toggleItem('cart', false)}
              use:link>
              login
            </a>
          </p>
        {/if}
      </div>
      <!-- end footer -->
    </div>
  </div>
</div>
