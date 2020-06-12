<script>
  import SmallNavbar from "./small-navbar.svelte";
  import BigNavbar from "./big-navbar.svelte";
  import globalStore from "../../stores/global-store";

  let screenWidth;

  $: if (screenWidth > 992) globalStore.toggleItem("sidebar", false);
</script>

<svelte:window bind:innerWidth={screenWidth} />
{#if screenWidth > 992}
  <BigNavbar />
{:else}
  <SmallNavbar />
{/if}
