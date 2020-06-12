<script>
  import { link } from "svelte-routing";
  import links from "../../constants/links";
  import globalStore from "../../stores/global-store";
</script>

<div class="sidebar-container">
  <div class="sidebar">
    <div class="sidebar-header">
      <button
        class="btn-close"
        on:click={() => globalStore.toggleItem('sidebar', false)}>
        <i class="fas fa-window-close" />
      </button>
    </div>
    <!-- site logo -->
    <img src="/assets/images/logo.svg" class="logo sidebar-logo" alt="razors" />
    <!-- links -->
    <ul class="sidebar-links">
      {#each links as sideLink}
        <li>
          <a
            href={sideLink.url}
            use:link
            on:click={() => globalStore.toggleItem('sidebar', false)}>
            >{sideLink.text}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>
