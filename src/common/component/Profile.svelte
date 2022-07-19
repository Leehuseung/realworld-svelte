<script>
    import {currentMenu, user} from "../js/store";
    import { useParams } from "svelte-navigator";
    import { useNavigate } from "svelte-navigator";
    import {noImage} from "../js/store";
    import axios from "axios";
    import ProfileDetail from "./ProfileDetail.svelte";
    import ArticlePreview from "../../article/component/ArticlePreview.svelte";
    import {onMount} from "svelte";
    import InfiniteScroll from "./InfiniteScroll.svelte";
    const navigate = useNavigate();

    $currentMenu = '@profile';

    const params = useParams();
    let username = $params.username;

    let selectActive = 'my';
    let articleHtml = 'Loading articles...';

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


    let offset = 0;
    let articlesCount = 0;
    let data = [];
    let newBatch = [];
    let param = '';

    async function fetchData() {
        const response = await axios.get(`/api/articles?${param}&limit=5&offset=${offset}`).then(res => res.data);
        articleHtml = 'No articles are here... yet.';
        newBatch = await response.articles;
        articlesCount = await response.articles;
    };

    onMount(()=> {
        param = `author=${username}`;
        fetchData();
    })

    $: data = [
        ...data,
        ...newBatch
    ];

    let initPage = () => {
        articleHtml = 'Loading articles...';
        offset = 0;
        newBatch = [];
        data = [];
    }

    let myArticlesEvent = e => {
        selectActive = 'my'
        param = `author=${username}`;
        initPage();
        fetchData();
    }

    let favoriteArticlesEvent = e => {
        selectActive = 'favorite'
        param = `favorited=${username}`;
        initPage();
        fetchData();
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
                {#if data.length !== 0}
                    {#each data as article}
                        <ArticlePreview article="{article}"/>
                    {/each}
                    <InfiniteScroll
                            hasMore={newBatch.length}
                          on:loadMore={() => {offset+=5; fetchData()}} />
                {:else }
                    <div class="article-preview">
                        {@html articleHtml}
                    </div>
                {/if}

            </div>

        </div>
    </div>
</div>

