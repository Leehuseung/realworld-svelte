<script>
    import {currentMenu, user} from "../js/store";
    import { useParams } from "svelte-navigator";
    import { useNavigate } from "svelte-navigator";
    import {noImage} from "../js/store";
    import axios from "axios";
    import ProfileDetail from "./ProfileDetail.svelte";
    import ArticlePreview from "../../article/component/ArticlePreview.svelte";
    const navigate = useNavigate();

    $currentMenu = '@profile';

    const params = useParams();
    let username = $params.username;

    let selectActive = 'my';

    let profile = {
        'username' : null,
        'image' : null,
        'bio' : null,
        'following' : null,
    }

    let myPage = false;
    user.subscribe(user => {
        if(user != null && user.username == username){
            myPage = true;
        }
    });

    axios.get('/api/profiles/' + username).then(res => {
        profile = res.data.profile;
        if(profile.image === null || profile.image === ""){
            profile.image = $noImage;
        }
    }).catch(error => {
        navigate("/", {
            replace: true,
        });
    });

    $: data = axios.get(`/api/articles?author=${username}&limit=5&offset=0`).then(res => res.data);

    let myArticlesEvent = e => {
        selectActive = 'my'
        data = axios.get(`/api/articles?author=${username}&limit=5&offset=0`).then(res => res.data);
    }

    let favoriteArticlesEvent = e => {
        selectActive = 'favorite'
        data = axios.get(`/api/articles?favorited=${username}&limit=5&offset=0`).then(res => res.data);
    }



</script>

<div class="profile-page">

    <ProfileDetail profile="{profile}" myPage="{myPage}"/>

    <div class="container">
        <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                    <ul class="nav nav-pills outline-active">
                        <li class="nav-item">
                            <a on:click={myArticlesEvent} class="nav-link {selectActive === 'my' ? 'active' : ''}" href="{null}">My Articles</a>
                        </li>
                        <li class="nav-item">
                            <a on:click={favoriteArticlesEvent}  class="nav-link {selectActive === 'favorite' ? 'active' : ''}" href="{null}">Favorited Articles</a>
                        </li>
                    </ul>
                </div>

                {#await data}
                    <div class="article-preview">
                        Loading articles...
                    </div>
                {:then data}
                    {#if data.articles.length != 0}
                        {#each data.articles as article}
                            <ArticlePreview bind:article="{article}"/>
                        {/each}
                    {:else}
                        <div class="article-preview">
                            No articles are here... yet.
                        </div>
                    {/if}
                {:catch error}
                    error
                {/await}

            </div>

        </div>
    </div>

</div>