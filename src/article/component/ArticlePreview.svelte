<script>
    import {dateToString} from "../../common/js/common_util";
    import {noImage} from "../../common/js/store";
    import axios from "axios";
    import {user} from "../../common/js/store";
    import {useNavigate} from "svelte-navigator";
    const navigate = useNavigate();

    export let article;

    if(article.author.image === '' || article.author.image === null){
        article.author.image = $noImage;
    }

    let favoriteClick = () => {
        if($user === null){
            navigate("/register");
            return;
        }
        if(article.favorited){
            axios.delete(`/api/articles/${article.slug}/favorite`).then((res) => {
                article.favorited = res.data.article.favorited;
                article.favoritesCount = res.data.article.favoritesCount;
            });
        } else {
            axios.post(`/api/articles/${article.slug}/favorite`).then((res) => {
                article.favorited = res.data.article.favorited;
                article.favoritesCount = res.data.article.favoritesCount;
            });
        }
    }

</script>

<div class="article-preview">
    <div class="article-meta">
        <a href="/profile/{article.author.username}"><img src="{article.author.image}" alt=""/></a>
        <div class="info">
            <a href="/profile/{article.author.username}" class="author">{article.author.username}</a>
            <span class="date">{dateToString(article.createdAt)}</span>
        </div>

        <button on:click={favoriteClick} class="btn {article.favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right">
            <i class="ion-heart"></i> {article.favoritesCount}
        </button>
    </div>
    <a href="/article/{article.slug}" class="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
            {#each article.tagList as tag}
                <li class="tag-default tag-pill tag-outline ng-binding ng-scope">
                    {tag}
                </li>
            {/each}
        </ul>
    </a>
</div>