<script>
    import { link } from "svelte-navigator";
    import { currentMenu } from "../js/store";

    $currentMenu = 'register';
</script>

<div class="auth-page">
    <div class="container page">
        <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign up</h1>
                <p class="text-xs-center">
                    <a href="/login" use:link
                    >Have an account?</a>
                </p>
<!-- validation시에 나오는 메세지 -->
<!--                <ul class="error-messages">-->
<!--                    <li>That email is already taken</li>-->
<!--                </ul>-->

                <form>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Your Name">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Email">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" placeholder="Password">
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right">
                        Sign up
                    </button>
                </form>
            </div>

        </div>
    </div>
</div>