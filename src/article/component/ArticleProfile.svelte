<script>
    import {user} from "../../common/js/store";
    import {useNavigate} from "svelte-navigator";
    import axios from "axios";
    const navigate = useNavigate();
    export let article;
    export let isWriter;

    let followButtonHtml = '';
    let favoritePostHtml = '';
    $: if(isWriter) {
        followButtonHtml = '<i class="ion-edit"></i> Edit Article';
        favoritePostHtml = '<i class="ion-trash-a"></i>  Delete Article';
    } else {
        if(article.author.following){
            followButtonHtml = `<i class="ion-plus-round"></i> Unfollow ${article.author.username}`;
        } else {
            followButtonHtml = `<i class="ion-plus-round"></i> Follow ${article.author.username}`;
        }
        if(article.favorited){
            favoritePostHtml = `<i class="ion-heart"></i> Unfavorite Article <span class="counter">(${article.favoritesCount})</span>`;
        } else {
            favoritePostHtml = `<i class="ion-heart"></i> Favorite Article <span class="counter">(${article.favoritesCount})</span>`;
        }

    }

    //Follow, Edit Event
    let followEvent = () => {
        if(isWriter){
            navigate(`/editor/${article.slug}`, {
                replace: true,
            });
            return;
        }
        if($user == null){
            navigate(`/register`);
            return;
        }
        if(article.author.following){
            axios.delete(`/api/profiles/${article.author.username}/follow`).then(res => {
                article.author.following = res.data.profile.following;
            });
        } else {
            axios.post(`/api/profiles/${article.author.username}/follow`).then(res => {
                article.author.following = res.data.profile.following;
            });
        }
    }

    //favorite,delete event
    let favoriteEvent = () => {
        if(isWriter){
            axios.delete(`/api/articles/${article.slug}`).then(() => {
                navigate("/", {
                    replace: true,
                });
            });
            return;
        }
        if($user == null){
            navigate(`/register`);
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

<div class="article-meta">
    <a href="/profile/{article.author.username}"><img alt="" src="{article.author.image}"/></a>
    <div class="info">
        <a href="/profile/{article.author.username}" class="author">{article.author.username}</a>
        <span class="date">{article.createdAt}</span>
    </div>
    <button on:click={followEvent}  class="btn btn-sm btn-outline-secondary">
        {@html followButtonHtml}
    </button>
    &nbsp;&nbsp;
    <button on:click={favoriteEvent} class="btn btn-sm {isWriter ? 'btn-outline-danger' : article.favorited ? 'btn-primary' : 'btn-outline-primary' }">
        {@html favoritePostHtml}
    </button>
</div>