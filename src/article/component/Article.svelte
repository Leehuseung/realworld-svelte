<script>
    import {useNavigate, useParams} from "svelte-navigator";
    import axios from "axios";
    import {noImage, user} from "../../common/js/store";
    import {dateToString} from "../../common/js/common_util";
    import ArticleProfile from "./ArticleProfile.svelte";
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
                {article.body}
            </div>
        </div>

        <hr/>

        <div class="article-actions">
            <ArticleProfile bind:article="{article}" bind:isWriter="{isWriter}"/>
        </div>

        <div class="row">

            <div class="col-xs-12 col-md-8 offset-md-2">

                <form class="card comment-form">
                    <div class="card-block">
                        <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                    </div>
                    <div class="card-footer">
                        <img alt="" src="{$user != null ? $user.image : ''}" class="comment-author-img"/>
                        <button class="btn btn-sm btn-primary">
                            Post Comment
                        </button>
                    </div>
                </form>

                <!-- 댓글 -->
<!--                <div class="card">
                    <div class="card-block">
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div class="card-footer">
                        <a href=null class="comment-author">
                            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>
                        </a>
                        &nbsp;
                        <a href=null class="comment-author">Jacob Schmidt</a>
                        <span class="date-posted">Dec 29th</span>
                    </div>
                </div>-->

                <!-- 댓글2 -->
<!--                <div class="card">
                    <div class="card-block">
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div class="card-footer">
                        <a href=null class="comment-author">
                            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>
                        </a>
                        &nbsp;
                        <a href=null class="comment-author">Jacob Schmidt</a>
                        <span class="date-posted">Dec 29th</span>
                        <span class="mod-options">
                          <i class="ion-edit"></i>
                          <i class="ion-trash-a"></i>
                        </span>
                    </div>
                </div>-->

            </div>

        </div>

    </div>

</div>