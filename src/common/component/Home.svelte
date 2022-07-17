<script>
    import {currentMenu, noImage} from "../js/store";
    import {user} from "../js/store";
    import ArticlePreview from "../../article/component/ArticlePreview.svelte";
    import axios from "axios";
    $currentMenu = 'home';

    $: data = axios.get('/api/articles?limit=10&offset=0').then(res => res.data);

    let selectActive = 'global';

    let yourFeedEvent = e => {
        selectActive = 'your';
        data = axios.get('/api/articles/feed?limit=10&offset=0').then(res => res.data);
    }

    let globalFeedEvent = e => {
        selectActive = 'global';
        data = axios.get('/api/articles?limit=10&offset=0').then(res => res.data);
    }

</script>

<div class="home-page">

    <div class="banner">
        <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
        </div>
    </div>

    <div class="container page">
        <div class="row">

            <div class="col-md-9">
                <div class="feed-toggle">
                    <ul class="nav nav-pills outline-active">
                        {#if $user}
                        <li class="nav-item">
                            <a on:click={yourFeedEvent} class="nav-link {selectActive === 'your' ? 'active' : ''}" href="{null}">Your Feed</a>
                        </li>
                        {/if}
                        <li class="nav-item">
                            <a on:click={globalFeedEvent} class="nav-link {selectActive === 'global' ? 'active' : ''}" href="{null}">Global Feed</a>
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

            <div class="col-md-3">
                <div class="sidebar">
                    <p>Popular Tags</p>

                    <div class="tag-list">
                        <a href="{null}" class="tag-pill tag-default">programming</a>
                        <a href="{null}" class="tag-pill tag-default">javascript</a>
                        <a href="{null}" class="tag-pill tag-default">emberjs</a>
                        <a href="{null}" class="tag-pill tag-default">angularjs</a>
                        <a href="{null}" class="tag-pill tag-default">react</a>
                        <a href="{null}" class="tag-pill tag-default">mean</a>
                        <a href="{null}" class="tag-pill tag-default">node</a>
                        <a href="{null}" class="tag-pill tag-default">rails</a>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>