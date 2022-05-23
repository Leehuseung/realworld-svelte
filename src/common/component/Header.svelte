<script>
    import { Router, Link, Route, link } from "svelte-navigator";

</script>

<nav class="navbar navbar-light">
    <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
                <a href="/" use:link class="nav-link active">Home</a>
            </li>
            <li class="nav-item">
                <a href="/editor" use:link class="nav-link">
                    <i class="ion-compose"></i>&nbsp;New Article
                </a>
            </li>
            <li class="nav-item">
                <a href="/settings" use:link class="nav-link">
                    <i class="ion-gear-a"></i>&nbsp;Settings
                </a>
            </li>
            <li class="nav-item" >
                <a href="/login" use:link class="nav-link">Sign in</a>
            </li>
            <li class="nav-item">
                <a href="/register" use:link class="nav-link">Sign up</a>
            </li>
        </ul>
    </div>
</nav>