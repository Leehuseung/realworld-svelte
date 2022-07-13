<script>
    import { Router, Route } from "svelte-navigator";
    import Header from "./common/component/Header.svelte";
    import Footer from "./common/component/Footer.svelte";
    import Home from "./common/component/Home.svelte";
    import PageNotFound from "./common/component/PageNotFound.svelte";
    import Register from "./login/component/Register.svelte";
    import Login from "./login/component/Login.svelte";
    import Settings from "./setting/component/Settings.svelte";
    import EditArticle from "./article/component/EditArticle.svelte";
    import Profile from "./common/component/Profile.svelte";
    import axios from "axios";
    import { user} from "./common/js/store";
    import common_config from "../common_config";

    //axios 기본 설정
    axios.defaults.baseURL = common_config.baseURL;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    axios.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';

</script>

<Header />

<Router>
    <div>
        <Route path="/">
            <Home />
        </Route>
        {#if $user}
            <Route path="/editor" component="{EditArticle}" />
            <Route path="/settings" component="{Settings}" />
        {:else }
            <Route path="/register" component="{Register}" />
            <Route path="/login" component="{Login}" />
            <Route component={PageNotFound} />
        {/if}
        <Route path="/profile/:username" component="{Profile}" />
    </div>
</Router>

<Footer />


<style>
</style>