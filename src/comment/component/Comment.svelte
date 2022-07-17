<script>
    import {user} from "../../common/js/store";
    import {noImage} from "../../common/js/store";
    import {dateToString} from "../../common/js/common_util";
    export let comment;
    export let deleteComment;

    if(comment.author.image === '' || comment.author.image === null){
        comment.author.image = $noImage;
    }

</script>

<div class="card">
    <div class="card-block">
        <p class="card-text">{@html comment.body}</p>
    </div>
    <div class="card-footer">
        <a href="/profile/{comment.author.username}" class="comment-author">
            <img alt="" src="{comment.author.image}" class="comment-author-img"/>
        </a>
        &nbsp;
        <a href="/profile/{comment.author.username}" class="comment-author">{comment.author.username}</a>
        <span class="date-posted">{dateToString(comment.updatedAt)}</span>
        {#if ($user !== null && $user.username === comment.author.username)}
        <span class="mod-options">
            <i on:click={deleteComment(comment.id)} class="ion-trash-a"></i>
        </span>
        {/if}
    </div>
</div>