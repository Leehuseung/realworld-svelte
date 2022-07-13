<script>
    import { currentMenu } from "../../common/js/store";
    import { useNavigate } from "svelte-navigator";
    import { user } from "../../common/js/store";
    import axios from "axios";
    import {login} from "../../login/js/login";
    let token = window.localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    let formDisabled = false;

    $currentMenu = 'settings';
    let emailValidateStyle = '';
    let bodyUser = {
        'username' : null,
        'email' : null,
        'bio' : null,
        'image' : null,
        'password' : null
    };

    axios.get('/api/user').then(res => {
        bodyUser.username = res.data.user.username;
        bodyUser.email = res.data.user.email;
        bodyUser.bio = res.data.user.bio;
        bodyUser.image = res.data.user.image;
    });

    let updateSetting = () => {
        if(login.validateEmail(bodyUser.email)){
            formDisabled = true;
            emailValidateStyle = null;

            axios.put('/api/user',JSON.stringify({
                'user': bodyUser
            })).then(res => {
                bodyUser = res.data.user;
                $user.username = bodyUser.username;
                window.localStorage.setItem("jwtToken",res.data.user.token);
            }).finally(() => {
               formDisabled = false;
            });
        } else {
            emailValidateStyle = 'red';
        }
    }

    let logout = () => {
        window.localStorage.removeItem("jwtToken");
        $user = null;
        navigate("/", {
            replace: true,
        });
    }
</script>

<div class="settings-page">
    <div class="container page">
        <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Your Settings</h1>
                <fieldset disabled={formDisabled}>
                    <fieldset class="form-group">
                        <input bind:value={bodyUser.image}  class="form-control" type="text" placeholder="URL of profile picture">
                    </fieldset>
                    <fieldset class="form-group">
                        <input bind:value={bodyUser.username} class="form-control form-control-lg" type="text" placeholder="Your Name">
                    </fieldset>
                    <fieldset class="form-group">
                        <textarea bind:value={bodyUser.bio} class="form-control form-control-lg" rows="8"
                                  placeholder="Short bio about you"></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                        <input bind:value={bodyUser.email} class="form-control form-control-lg" type="text" placeholder="Email" style:border-color="{emailValidateStyle}">
                    </fieldset>
                    <fieldset class="form-group">
                        <input bind:value={bodyUser.password} class="form-control form-control-lg" type="password" placeholder="Password">
                    </fieldset>
                    <button on:click={updateSetting} class="btn btn-lg btn-primary pull-xs-right">
                        Update Settings
                    </button>
                </fieldset>
                <hr>
                <button on:click={logout} class="btn btn-outline-danger">Or click here to logout</button>
            </div>

        </div>
    </div>
</div>