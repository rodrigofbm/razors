<script>
  import { onMount } from "svelte";
  import { navigate, link } from "svelte-routing";
  import user from "../stores/user";
  import cart, { cartTotalPrice } from "../stores/cart";
  import globalStore from "../stores/global-store";
  import submitOrder from "../strapi/submit-order";

  let name = "";
  // stripe vars
  let cardElement;
  let cardErros;
  let card;
  let stripe;
  let elements;
  $: isEmpity = !name || $globalStore.alert;

  onMount(() => {
    if (!$user.jwt) {
      navigate("/");
      return;
    }

    if ($cartTotalPrice > 0) {
      stripe = Stripe("pk_test_QGztT8ZDnLssu3xelztP8ywU00MbvpwIe1");
      elements = stripe.elements();
      card = elements.create("card");
      card.mount(cardElement);
      card.addEventListener("change", function(event) {
        if (event.error) {
          cardErros.textContent = event.error.message;
        } else {
          cardErros.textContent = "";
        }
      });
    }
  });

  async function handleSubmit() {
    let response = await stripe.createToken(card).catch(console.error);
    globalStore.toggleItem("alert", true, "submitting order...");
    const { token } = response;
    if (token) {
      const { id } = token;

      let order = await submitOrder({
        name,
        total: $cartTotalPrice,
        items: $cart,
        stripeTokenId: id,
        userToken: $user.jwt
      });

      if (order) {
        globalStore.toggleItem("alert", true, "your order is complete!");
        cart.set([]);
        localStorage.setItem("cart", JSON.stringify([]));

        navigate("/");

        return;
      }

      globalStore.toggleItem(
        "alert",
        true,
        "there was an error with your order. please try again!",
        true
      );
    }
  }
</script>

{#if $cartTotalPrice > 0}
  <section class="form">
    <h2 class="section-title">checkout</h2>
    <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
      <h3>order total : ${$cartTotalPrice}</h3>
      <div class="form-control">
        <label for="name">your name</label>
        <input type="text" id="name" bind:value={name} />
      </div>
      <div class="stripe-input">
        <!-- info -->
        <label for="card-element">Credit or Debit Card</label>
        <p class="stripe-info">
          Test using this credit card
          <span>4242 4242 4242 4242</span>
          <br />
          enter any 5 digits for zip code
          <br />
          enter any 3 digits for the CVC
        </p>
        <!-- bing the ditv to cardElement -->
        <div id="card-element" bind:this={cardElement}>
          <!-- stripe -->
        </div>

        <div id="card-errors" bind:this={cardErros} role="alert" />
      </div>

      {#if isEmpity}
        <p class="form-empty">please fill out name field</p>
      {/if}

      <button
        type="submit"
        class="btn btn-block btn-primary"
        class:disabled={isEmpity}
        disabled={isEmpity}>
        submit
      </button>
    </form>
  </section>
{:else}
  <div class="checkout-empty">
    <h2>your cart is empty</h2>
    <a class="btn btn-primary" href="/products" use:link>fill it</a>
  </div>
{/if}
