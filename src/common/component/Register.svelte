<script>
    import { link,useNavigate  } from "svelte-navigator";
    import {currentMenu, user} from "../js/store";

    const navigate = useNavigate();
    $currentMenu = 'register';

    let username = '';
    let email = '';
    let password = '';
    let errorHtml = '';

    let register = function (){
        if(loginValidation()){
            $user = { email, password };
            currentMenu.update(() => 'home');
            navigate("/", {
                replace: true,
            });
        }
    }

    let loginValidation = function() {
        if(username === ''){
            errorHtml = '<li>username can\'t be blank</li>';
            return false;
        } else if(email === ''){
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
                <h1 class="text-xs-center">Sign up</h1>
                <p class="text-xs-center">
                    <a href="/login" use:link
                    >Have an account?</a>
                </p>
                <ul class="error-messages">
                    {@html errorHtml}
                </ul>

                <form>
                    <fieldset class="form-group">
                        <input bind:value={username} class="form-control form-control-lg" type="text" placeholder="Your Name">
                    </fieldset>
                    <fieldset class="form-group">
                        <input  bind:value={email} class="form-control form-control-lg" type="text" placeholder="Email">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" placeholder="Password">
                    </fieldset>
                    <button on:click={register} type="button"  class="btn btn-lg btn-primary pull-xs-right">
                        Sign up
                    </button>
                </form>
            </div>

        </div>
    </div>
</div>