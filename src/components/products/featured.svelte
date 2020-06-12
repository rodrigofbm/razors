<script>
  // data
  import products, { featuredStore } from "../../stores/default-products";
  // components
  import Product from "./product.svelte";
  import Loading from "../loading.svelte";
  // variables
  export let title = "";
</script>

<section class="section">
  <h2 class="section-title">{title}</h2>
  <div class="products-center">
    {#each $featuredStore as product (product.id)}
      <Product {product} />
    {:else}
      <Loading />
    {/each}
  </div>

</section>
