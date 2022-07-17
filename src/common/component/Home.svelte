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

    $: tagData = axios.get('/api/tags').then(res => res.data);

    let selectTag = '';
    let clickTag = tag => {
        return e => {
            selectActive = 'tag';
            selectTag = tag;
            data = axios.get(`/api/articles?tag=${tag}&limit=10&offset=0`).then(res => res.data);
        }
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
                        {#if selectActive === 'tag'}
                            <li class="nav-item">
                                <a class="nav-link active" href="{null}"># {selectTag}</a>
                            </li>
                        {/if}
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
                        {#await tagData}
                            Loading tags...
                        {:then tagData}
                            {#if tagData.tags !== 0}
                                {#each tagData.tags as tag}
                                    <a on:click={ clickTag(tag) } href="{null}" class="tag-pill tag-default">{ tag }</a>
                                {/each}
                            {:else}
                                <div class="article-preview">
                                    No tags are here... yet.
                                </div>
                            {/if}
                        {:catch error}
                            Tag Loding error...
                        {/await}

                    </div>
                </div>
            </div>

        </div>
    </div>

</div>