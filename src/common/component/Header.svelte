<script>
    import { link } from "svelte-navigator";
    import { user } from "../js/store";
    import { currentMenu } from "../js/store";
</script>

<nav class="navbar navbar-light">
    <div class="container">
        <a use:link class="navbar-brand"
           href="/"
           class:active={$currentMenu == 'home'}
           on:click={() => currentMenu.update(() => 'home')}
        >conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
                <a href="/"
                   use:link class="nav-link active"
                   class:active={$currentMenu == 'home'}
                   on:click={() => currentMenu.update(() => 'home')}
                >Home</a>
            </li>

            {#if $user}
                <li class="nav-item">
                    <a href="/editor"
                       use:link class="nav-link"
                       class:active={$currentMenu == 'editor'}
                       on:click={() => currentMenu.update(() => 'editor')}
                    >
                        <i class="ion-compose"></i>&nbsp;New Article
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/settings"
                       use:link class="nav-link"
                       class:active={$currentMenu == 'settings'}
                       on:click={() => currentMenu.update(() => 'settings')}
                    >
                        <i class="ion-gear-a"></i>&nbsp;Settings
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/@profile"
                       use:link class="nav-link"
                       class:active={$currentMenu == '@profile'}
                       on:click={() => currentMenu.update(() => '@profile')}
                    >profile</a>
                </li>
            {:else }
                <li class="nav-item" >
                    <a href="/login"
                       use:link class="nav-link"
                       class:active={$currentMenu == 'signIn'}
                       on:click={() => currentMenu.update(() => 'signIn')}
                    >Sign in</a>
                </li>
                <li class="nav-item">
                    <a href="/register"
                       use:link class="nav-link"
                       class:active={$currentMenu == 'signOut'}
                       on:click={() => currentMenu.update(() => 'signOut')}
                    >Sign up</a>
                </li>
            {/if}

        </ul>
    </div>
</nav>