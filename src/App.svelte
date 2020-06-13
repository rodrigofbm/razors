<script>
  // router
  import { Router, Route, Link } from "svelte-routing";
  // store
  import globalStore from "./stores/global-store";
  // pages
  import Home from "./pages/home.svelte";
  import Login from "./pages/login.svelte";
  import Checkout from "./pages/checkout.svelte";
  import About from "./pages/about.svelte";
  import Products from "./pages/products.svelte";
  import ProductTemplate from "./pages/product-template.svelte";
  // components
  import Navbar from "./components/navbar/navbar.svelte";
  import Sidebar from "./components/navbar/sidebar.svelte";
  import Cart from "./components/cart/cart.svelte";
</script>

<Router>
  <Navbar />
  {#if $globalStore.sidebar}
    <Sidebar />
  {/if}
  {#if $globalStore.cart}
    <Cart />
  {/if}
  <div>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/login" component={Login} />
    <Route path="/products" component={Products} />
    <Route path="/products/:id" component={ProductTemplate} />
    <Route path="/checkout" component={Checkout} />
  </div>
</Router>
