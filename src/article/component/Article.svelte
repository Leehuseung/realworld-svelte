<script>
    import {useNavigate, useParams} from "svelte-navigator";
    import axios from "axios";
    import {noImage, user} from "../../common/js/store";
    import {dateToString} from "../../common/js/common_util";
    import ArticleProfile from "./ArticleProfile.svelte";
    import CommentArea from "../../comment/component/CommentArea.svelte";
    import { marked } from "marked";
    const navigate = useNavigate();
    const params = useParams();

    let slug = $params.slug;
    let isWriter = false;

    let article = {
        "slug": "",
        "title": "",
        "description": "",
        "body": "",
        "tagList": [],
        "createdAt": "",
        "updatedAt": "",
        "favorited": false,
        "favoritesCount": 0,
        "author": {
            "username": "",
            "bio": "",
            "image": $noImage,
            "following": false
        }
    }

    axios.get(`/api/articles/${slug}`).then(res => {
        article = res.data.article;
        if(article.author.image === '' || article.author.image === null){
            article.author.image = $noImage;
        }
        article.updatedAt = dateToString(article.updatedAt);
        user.subscribe(user => {
            if(user != null && user.username === article.author.username){
                isWriter = true;
            }
        });
    }).catch(error => {
        navigate("/register", {
            replace: true,
        });
    });

</script>

<div class="article-page">

    <div class="banner">
        <div class="container">

            <h1>{article.title}</h1>

            <ArticleProfile bind:article="{article}" bind:isWriter="{isWriter}" />

        </div>
    </div>

    <div class="container page">

        <div class="row article-content">
            <div class="col-md-12">
                {@html marked.parse(article.body)}
            </div>
            <ul class="tag-list">
                {#each article.tagList as tag}
                <li class="tag-default tag-pill tag-outline ng-binding ng-scope">
                    {tag}
                </li>
                {/each}
            </ul>
        </div>


        <hr/>

        <div class="article-actions">
            <ArticleProfile bind:article="{article}" bind:isWriter="{isWriter}"/>
        </div>

        <CommentArea bind:slug={slug}/>

    </div>

</div>