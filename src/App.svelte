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
    import Article from "./article/component/Article.svelte";
    import axios from "axios";
    import { user } from "./common/js/store";
    import { noImage } from "./common/js/store";
    import common_config from "../common_config";

    //axios 기본 설정
    axios.defaults.baseURL = common_config.baseURL;
    axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
    axios.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';
    axios.interceptors.request.use(function (config) {
        let token = window.localStorage.getItem("jwtToken");
        if(token != null){
            config.headers.Authorization = 'Token ' + token;
        }
        return config;
    },function (error) {
        console.log('error',error);
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        console.log('error',error);
        return Promise.reject(error);
    });

    axios.get('/api/user').then(res => {
        let resUser = res.data.user;
        if(resUser.image === '' || resUser.image === null){
            resUser.image = $noImage;
        }
        user.set(res.data.user);
    });

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