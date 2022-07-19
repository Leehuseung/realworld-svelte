<script>
    import {user} from "../../common/js/store";
    import {noImage} from "../../common/js/store";
    import axios from "axios";
    import Comment from "./Comment.svelte";
    import {writable} from "svelte/store";
    export let slug;

    $: commentArr = writable([]);

    $: data = axios.get(`/api/articles/${slug}/comments`).then(res => {
        commentArr.set(res.data.comments);
    });

    let commentBody = '';

    let postComment = () => {
        if(commentBody !== ''){
            axios.post(`/api/articles/`+encodeURIComponent(slug)+`/comments`,{
                "comment": {
                    "body": commentBody
                }
            }).then(res => {
                if(res.data.comment.author.image === '' || res.data.comment.author.image === null){
                    res.data.comment.author.image = $noImage;
                }
                $commentArr.unshift(res.data.comment);
                commentArr.set($commentArr);
                commentBody = '';
            });
        }
    }

    let deleteComment = id => {
        return () => {
            axios.delete(`/api/articles/`+encodeURIComponent(slug)+`/comments/${id}`).then(() => {
                for (let i = 0; i < $commentArr.length; i++) {
                    if($commentArr[i].id === id){
                        $commentArr.splice(i,1);
                        commentArr.set($commentArr);
                        break;
                    }
                }
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

        {#await $commentArr}
            <div class="article-preview">
                Loading comments...
            </div>
        {:then $commentArr}
            {#if $commentArr.length !== 0}
                {#each $commentArr as comment}
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