<script>
    import { user } from "../../common/js/store";
    import { link,useNavigate } from "svelte-navigator";
    import { currentMenu } from "../../common/js/store";
    import {login} from "../js/login";
    import axios from "axios";

    const navigate = useNavigate();
    $currentMenu = 'login';

    let email = '';
    let password = '';
    let errorHtml = '';
    let emailValidateStyle = '';

    let loginCheck = function (){
        if(loginValidation()){

            axios.post('/api/users/login',JSON.stringify({
                'user' : {
                    'email' : email,
                    'password' : password
                }
            }))
            .then(res => {
                currentMenu.update(() => 'home');
                window.localStorage.setItem("jwtToken",res.data.user.token);
                $user = {
                    'jwtToken' : window.localStorage.getItem("jwtToken"),
                    'username' : res.data.user.username
                };
                navigate("/", {
                    replace: true,
                });

            }).catch(error => {
                let data = error.response.data.errors;
                errorHtml =  `<li>${data}</li>`;
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
        } else if(!login.validateEmail(email)){
            errorHtml = '<li>email is invalid</li>';
            return false;
        }

        return true;
    }

    $: if(login.validateEmail(email)){
        emailValidateStyle = null;
    } else {
        emailValidateStyle = 'red';
    }

    let keyPress = e => {
        if(e.charCode === 13){
            loginCheck();
        }
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
                        <input on:keypress={keyPress}  bind:value={email} class="form-control form-control-lg" type="text" placeholder="Email" style:border-color="{emailValidateStyle}">
                    </fieldset>
                    <fieldset class="form-group">
                        <input on:keypress={keyPress} bind:value={password} class="form-control form-control-lg" type="password" placeholder="Password">
                    </fieldset>
                    <button on:click={loginCheck} type="button" class="btn btn-lg btn-primary pull-xs-right">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>