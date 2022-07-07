<script>
    import { link,useNavigate  } from "svelte-navigator";
    import {currentMenu, user} from "../js/store";
    import axios from "axios";

    const navigate = useNavigate();
    $currentMenu = 'register';

    let username = '';
    let email = '';
    let password = '';
    let errorHtml = '';
    let emailValidateStyle = '';

    let register = function (){
        if(loginValidation()){
            // $user = { email, password };

            let body = {
                'user' : {
                    'username' : username,
                    'email' : email,
                    'password' : password
                }
            }

            axios.post('/api/users',JSON.stringify(body))
            .then(response => {
                currentMenu.update(() => 'home');
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
        } else if(!validateEmail(email)){
            errorHtml = '<li>email is invalid</li>';
            return false;
        }

        return true;
    }

    let validateEmail = function(email) {
        return email == '' || String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    $: if(validateEmail(email)){
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