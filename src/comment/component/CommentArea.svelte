<script>
    import {user} from "../../common/js/store";
    import {noImage} from "../../common/js/store";
    import axios from "axios";
    import Comment from "./Comment.svelte";
    export let slug;

    let commentArr = [];

    $: data = axios.get(`/api/articles/`+encodeURIComponent(slug)+`/comments`).then(res => res.data);

    let commentBody = '';

    let postComment = () => {
        if(commentBody !== ''){
            axios.post(`/api/articles/`+encodeURIComponent(slug)+`/comments`,{
                "comment": {
                    "body": commentBody
                }
            }).then(res => {
                data = axios.get(`/api/articles/`+encodeURIComponent(slug)+`/comments`).then(res => res.data);
                commentBody = '';
            });
        }
    }

    let deleteComment = id => {
        return () => {
            axios.delete(`/api/articles/`+encodeURIComponent(slug)+`/comments/${id}`).then(() => {
                data = axios.get(`/api/articles/`+encodeURIComponent(slug)+`/comments`).then(res => res.data);
            });
        }
    }

</script>

<div class="row">

    <div class="col-xs-12 col-md-8 offset-md-2">

        {#if $user !== null}
            <div class="card comment-form">
                <div class="card-block">
                    <textarea bind:value={commentBody} class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                </div>
                <div class="card-footer">
                    <img alt="" src="{$user != null ? $user.image : $noImage}" class="comment-author-img"/>
                    <button on:click={postComment} class="btn btn-sm btn-primary">
                        Post Comment
                    </button>
                </div>
            </div>
        {:else}
            <p style="display: inherit;">
                <a href="/login">Sign in</a> or <a href="/register">sign up</a> to add comments on this article.
            </p>
        {/if}

        {#await data}
            <div class="article-preview">
                Loading comments...
            </div>
        {:then data}
            {#if data.comments.length != 0}
                {#each data.comments as comment}
                    <Comment bind:comment={comment} deleteComment="{deleteComment}"/>
                {/each}
            {:else}
                <div></div>
            {/if}
        {:catch error}
            error
        {/await}

    </div>

</div>