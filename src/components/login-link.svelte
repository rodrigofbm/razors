<script>
  import { link } from "svelte-routing";
  import user from "../stores/user";
  import globalStore from "../stores/global-store";
  // loggout func
</script>

{#if $user.jwt}
  <a
    class="logout-btn"
    href="/"
    use:link
    on:click={() => {
      globalStore.toggleItem('sidebar', false);
    }}>
    logout
  </a>
{:else}
  <a
    href="/login"
    use:link
    on:click={() => {
      globalStore.toggleItem('sidebar', false);
    }}>
    login
  </a>
{/if}
