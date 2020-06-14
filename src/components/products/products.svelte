<script>
  // data
  import products from "../../stores/products";
  // components
  import Product from "./product.svelte";
  import Loading from "../loading.svelte";
  // variables
  export let title = "";
  // lifecycle
  /* 
    onMount(() => {
      unsubscribe = products.subscribe(data => (localProducts = data));
    });

    onDestroy(() => unsubscribe()); 
    all this can be dono with: $products
  */
</script>

<section class="section">
  <h2 class="section-title">{title}</h2>
  <div class="products-center">
    {#each $products as product (product.id)}
      <Product {product} />
    {:else}
      <Loading />
    {/each}
  </div>

</section>
