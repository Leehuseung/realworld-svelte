<script>
    import { onDestroy, createEventDispatcher } from "svelte";
    export let hasMore = true;

    const dispatch = createEventDispatcher();
    let isLoadMore = false;
    let component;

    let scroll = e => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (!isLoadMore && hasMore) {
                dispatch("loadMore");
            }
            isLoadMore = true;
        } else {
            isLoadMore = false;
        }
    };

    window.addEventListener("scroll",scroll);

    onDestroy(() => {
        window.removeEventListener("scroll",scroll);
    });
</script>

<div bind:this={component} style="width:0px" />