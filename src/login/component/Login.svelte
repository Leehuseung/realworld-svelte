<script>
    import { user } from "../../common/js/store";
    import { link,useNavigate } from "svelte-navigator";
    import { currentMenu } from "../../common/js/store";

    const navigate = useNavigate();
    $currentMenu = 'login';

    let email = '';
    let password = '';
    let errorHtml = '';

    let login = function (){
        if(loginValidation()){
            // $user = { email, password };
            currentMenu.update(() => 'home');
            navigate("/", {
                replace: true,
            });
        }
    }

    let loginValidation = function() {
        if(email === ''){
            errorHtml = '<li>email can\'t be blank</li>';
            return false;
        } else if(password === '') {
            errorHtml = '<li>password can\'t be blank</li>';
            return false;
        }
        // 비밀번호 맞지 않을경우
        // else if(){
        //     validateHtml = '<li>email or password is invalid</li>';
        // }
        return true;
    }

</script>

<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign in</h1>
                <p class="text-xs-center">
                    <a href="/register" use:link
                    >Need an account?</a>
                </p>
                <ul class="error-messages">
                    {@html errorHtml}
                </ul>
                <form>
                    <fieldset class="form-group">
                        <input bind:value={email} class="form-control form-control-lg" type="text" placeholder="Email" >
                    </fieldset>
                    <fieldset class="form-group">
                        <input bind:value={password} class="form-control form-control-lg" type="password" placeholder="Password">
                    </fieldset>
                    <button on:click={login} type="button" class="btn btn-lg btn-primary pull-xs-right">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>