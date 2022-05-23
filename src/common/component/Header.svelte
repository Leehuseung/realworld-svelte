<script>
    import { Router, Link, Route } from "svelte-navigator";
    function moveSignIn(){

    }

    function moveSignUp(){

    }
</script>

<nav class="navbar navbar-light">
    <div class="container">
        <Router>
            <a class="navbar-brand" href="index.html">conduit</a>
            <ul class="nav navbar-nav pull-xs-right">
                <nav>
                    <li class="nav-item">
                        <!-- Add "active" class when you're on that page" -->
                        <Link to="/" >
                            <a class="nav-link active">Home</a>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/editor">
                            <a class="nav-link">
                                <i class="ion-compose"></i>&nbsp;New Article
                            </a>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/settings">
                            <a class="nav-link">
                                <i class="ion-gear-a"></i>&nbsp;Settings
                            </a>
                        </Link>
                    </li>

                    <li class="nav-item" >
                        <Link to="/login" >
                            <a class="nav-link" href="">Sign in</a>
                        </Link>
                    </li>


                    <li class="nav-item">
                        <Link to="/register">
                            <a class="nav-link" href="">Sign up</a>
                        </Link>
                    </li>

                </nav>
            </ul>
        </Router>
    </div>
</nav>