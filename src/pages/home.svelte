<script>
  // routing
  import { link } from "svelte-routing";
  // components
  import Hero from "../components/hero.svelte";
  // featured products
  // functions
</script>

<Hero>
  <a href="/products" class="btn btn-primary btn-hero" use:link>shop now</a>
</Hero>
