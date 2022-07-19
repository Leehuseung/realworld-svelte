<script>
    import {currentMenu, noImage} from "../js/store";
    import {user} from "../js/store";
    import ArticlePreview from "../../article/component/ArticlePreview.svelte";
    import axios from "axios";
    import {onMount} from "svelte";
    import InfiniteScroll from "./InfiniteScroll.svelte";
    $currentMenu = 'home';
    let selectActive = 'global';

    let offset = 0;
    let articlesCount = 0;
    let data = [];
    let newBatch = [];
    let param = '';
    let requestUrl = '';

    async function fetchData() {
        const response = await axios.get(requestUrl + param +`limit=10&offset=${offset}`).then(res => res.data);
        newBatch = await response.articles;
        articlesCount = await response.articles;
    };

    onMount(()=> {
        requestUrl = `/api/articles?`;
        fetchData();
    })

    $: data = [
        ...data,
        ...newBatch
    ];

    let initPage = () => {
        offset = 0;
        param = '';
        newBatch = [];
        data = [];
    }

    let yourFeedEvent = e => {
        selectActive = 'your';
        requestUrl = `/api/articles/feed?`;
        initPage();
        fetchData();
    }

    let globalFeedEvent = e => {
        selectActive = 'global';
        requestUrl = `/api/articles?`;
        initPage();
        fetchData();
    }

    $: tagData = axios.get('/api/tags').then(res => res.data);

    let selectTag = '';
    let clickTag = tag => {
        return e => {
            initPage();
            selectActive = 'tag';
            selectTag = tag;
            requestUrl = `/api/articles?`;
            param = `tag=${tag}&`;
            fetchData();
            // data = axios.get(`/api/articles?tag=${tag}&limit=10&offset=0`).then(res => res.data);
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

                {#if data.length !== 0}
                    {#each data as article}
                        <ArticlePreview article="{article}"/>
                    {/each}
                    <InfiniteScroll
                            hasMore={newBatch.length}
                            on:loadMore={() => {offset+=10; fetchData()}} />
                {:else }
                    <div class="article-preview">
                        No articles are here... yet.
                    </div>
                {/if}

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