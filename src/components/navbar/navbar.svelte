<script>
  import SmallNavbar from "./small-navbar.svelte";
  import BigNavbar from "./big-navbar.svelte";

  let screenWidth;
</script>

<svelte:window bind:innerWidth={screenWidth} />
{#if screenWidth > 992}
  <BigNavbar />
{:else}
  <SmallNavbar />
{/if}
