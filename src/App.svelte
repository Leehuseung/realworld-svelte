<script>
    import { Router, Route } from "svelte-navigator";
    import Header from "./common/component/Header.svelte";
    import Footer from "./common/component/Footer.svelte";
    import Home from "./common/component/Home.svelte";
    import PageNotFound from "./common/component/PageNotFound.svelte";
    import Register from "./common/component/Register.svelte";
    import Login from "./common/component/Login.svelte";
    import Settings from "./setting/component/Settings.svelte";
    import EditArticle from "./article/component/EditArticle.svelte";
    import Profile from "./common/component/Profile.svelte";


</script>

<Header />

<Router>
    <div>
        <Route path="/">
            <Home />
        </Route>
        <Route path="/editor" component="{EditArticle}" />
        <Route path="/settings" component="{Settings}" />
        <Route path="/register" component="{Register}" />
        <Route path="/@profile" component="{Profile}" />
        <Route path="/login" component="{Login}" />

        <Route component={PageNotFound} />
    </div>
</Router>

<Footer />


<style>
</style>