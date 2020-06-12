<script>
  import { link } from "svelte-routing";
  // global store
  import products, { getProductById } from "../stores/default-products";
  import Loading from "../components/loading.svelte";
  // variables
  export let id;
  export let location;
  $: product = $products.find(p => p.id === parseInt(id));
</script>

<svelte:head>
  <title>{product.title}</title>
</svelte:head>
{#if !product}
  <Loading />
{:else}
  <section class="single-product">
    <a class="btn btn-primary" href="/products" use:link>back to products</a>
    <div class="single-product-container">
      <article class="single-product-image">
        <img src={product.image} alt={product.title} />
      </article>
      <article>
        <h1>{product.title}</h1>
        <h2>${product.price}</h2>
        <p>{product.description}</p>
        <button
          class="btn btn-primary btn-block"
          on:click={() => console.log('click')}>
          add to cart
        </button>
      </article>
    </div>
  </section>
{/if}
