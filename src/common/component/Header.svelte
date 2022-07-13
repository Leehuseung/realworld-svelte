<script>
    import { link } from "svelte-navigator";
    import { user } from "../js/store";
    import { currentMenu } from "../js/store";
    import axios from "axios";

    //로그인 상태 처리
    if(window.localStorage.getItem('jwtToken') != null){
        let token = window.localStorage.getItem("jwtToken");
        $user = {
            'jwtToken' : token,
            'username' : ''
        };

        axios.get('/api/user').then(res => {
            $user.username = res.data.user.username;
        });

    } else {
        $user = null;
    }
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
                >Home</a>
            </li>

            {#if $user}
                <li class="nav-item">
                    <a href="/editor"
                       use:link class="nav-link"
                       class:active={$currentMenu == 'editor'}
                    >
                        <i class="ion-compose"></i>&nbsp;New Article
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/settings"
                       use:link class="nav-link"
                       class:active={$currentMenu == 'settings'}
                    >
                        <i class="ion-gear-a"></i>&nbsp;Settings
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/profile/{$user.username}"
                       use:link class="nav-link"
                       class:active={$currentMenu == '@profile'}
                    >{$user.username}</a>
                </li>
            {:else }
                <li class="nav-item" >
                    <a href="/login"
                       use:link class="nav-link"
                       class:active={$currentMenu == 'login'}
                    >Sign in</a>
                </li>
                <li class="nav-item">
                    <a href="/register"
                       use:link class="nav-link"
                       class:active={$currentMenu == 'register'}
                    >Sign up</a>
                </li>
            {/if}

        </ul>
    </div>
</nav>