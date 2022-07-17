<script>
    import { link,useNavigate  } from "svelte-navigator";
    import {currentMenu, user} from "../../common/js/store";
    import axios from "axios";
    import {login} from "../js/login";

    const navigate = useNavigate();
    $currentMenu = 'register';

    let username = '';
    let email = '';
    let password = '';
    let errorHtml = '';
    let emailValidateStyle = '';

    let register = function (){
        if(loginValidation()){

            let body = {
                'user' : {
                    'username' : username,
                    'email' : email,
                    'password' : password
                }
            }

            axios.post('/api/users',JSON.stringify(body))
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
                errorHtml =  '<li>'+ Object.keys(data)[0] + ' ' + data[Object.keys(data)[0]] + '</li>';
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
                        <input  bind:value={email} class="form-control form-control-lg" type="text" placeholder="Email" style:border-color="{emailValidateStyle}">
                    </fieldset>
                    <fieldset class="form-group">
                        <input bind:value={password} class="form-control form-control-lg" type="password" placeholder="Password">
                    </fieldset>
                    <button on:click={register} type="button"  class="btn btn-lg btn-primary pull-xs-right">
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>