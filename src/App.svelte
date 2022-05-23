<script>
    import { Router, Link, Route } from "svelte-navigator";
    import Header from "./common/component/Header.svelte";
    import Footer from "./common/component/Footer.svelte";
    import Home from "./common/component/Home.svelte";
    import PageNotFound from "./common/component/PageNotFound.svelte";
    import Register from "./common/component/Register.svelte";
</script>

<Header />

<Router>
    <div>
        <Route path="/">
            <Home />
        </Route>
        <Route path="/register" >
            <Register />
        </Route>

        <Route component={PageNotFound} />
    </div>
</Router>

<Footer />


<style>
</style>