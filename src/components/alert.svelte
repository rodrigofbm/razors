<script>
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";

  import globalStore from "../stores/global-store";

  const handleClose = () => {
    globalStore.toggleItem("alert", false);
  };

  let timeout;
  onMount(() => {
    timeout = setTimeout(() => {
      globalStore.toggleItem("alert", false);
    }, 3000);
  });

  onDestroy(() => clearTimeout(timeout));
</script>

<div
  class="alert-container"
  class:alert-danger={$globalStore.alertDanger}
  in:fly={{ y: -200, duration: 1000 }}
  out:fade={{ duration: 0 }}>
  <div class="alert">
    <p>{$globalStore.alertText}</p>
    <button class="alert-close" on:click={handleClose}>
      <i class="fas fa-window-close" />
    </button>
  </div>
</div>
