<script>
    import { user } from "../js/store";
    import { useNavigate } from "svelte-navigator";
    import { currentMenu } from "../js/store";

    const navigate = useNavigate();

    let username;
    let password;

    function login() {
        $user = { username, password };
        currentMenu.update(() => 'home');
        navigate("/", {
            replace: true,
        });
    }

</script>

<div class="auth-page">
    <div class="container page">
        <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign in</h1>
                <p class="text-xs-center">
                    <a href="{null}">Need an account?</a>
                </p>

                <form>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Email">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" placeholder="Password">
                    </fieldset>
                    <button on:click={login} class="btn btn-lg btn-primary pull-xs-right">
                        Sign in
                    </button>
                </form>
            </div>

        </div>
    </div>
</div>