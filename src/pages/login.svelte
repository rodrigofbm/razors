<script>
  import { navigate } from "svelte-routing";
  import globalStore from "../stores/global-store";
  import loginUser from "../strapi/login-user";
  import registerUser from "../strapi/register-user";
  // variables
  let email = "";
  let password = "";
  let username = "default username";
  let isMember = true;
  $: isEmpty = !email || !password || !username || $globalStore.alert;

  function toggleMember() {
    isMember = !isMember;

    if (!isMember) username = "";
    else username = "default username";
  }

  async function handleSubmit() {
    let user;

    globalStore.toggleItem("alert", true, "loading...");

    if (isMember) {
      user = await loginUser({ email, password });
    } else {
      user = await registerUser({ email, password, username });
    }

    if (user) {
      navigate("products");
      globalStore.toggleItem("alert", true, "welcome to the shop!");

      return;
    }

    globalStore.toggleItem(
      "alert",
      true,
      "there was an error! please try again",
      true
    );
  }
</script>

<section class="form">
  <h2 class="section-title">
    {#if isMember}sign in{:else}register{/if}
  </h2>
  <form class="login-form" on:submit|preventDefault={handleSubmit}>
    <div class="form-control">
      <label for="email">email</label>
      <input type="email" id="email" bind:value={email} />
    </div>

    <div class="form-control">
      <label for="password">password</label>
      <input type="password" id="password" bind:value={password} />
    </div>

    {#if !isMember}
      <div class="form-control">
        <label for="username">username</label>
        <input type="text" id="username" bind:value={username} />
      </div>
    {/if}

    {#if isEmpty}
      <p class="form-empty">please fill out all fields</p>
    {/if}

    <button
      type="submit"
      class="btn btn-block btn-primary"
      class:disabled={isEmpty}
      disabled={isEmpty}>
      submit
    </button>

    {#if isMember}
      <p class="register-link">
        need to register?
        <button type="button" on:click={toggleMember}>click here</button>
      </p>
    {:else}
      <p class="register-link">
        already a member?
        <button type="button" on:click={toggleMember}>click here</button>
      </p>
    {/if}
  </form>
</section>
