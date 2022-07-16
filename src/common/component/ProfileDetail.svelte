<script>
    import {user} from "../js/store";
    import axios from "axios";
    import {useNavigate, useParams} from "svelte-navigator";
    export let profile;
    export let myPage;

    const navigate = useNavigate();
    const params = useParams();

    let username = $params.username;

    let followEvent = () => {
        //나의 프로필이면 Settings로 이동
        if(myPage){
            navigate("/settings", {
                replace: true,
            });
        } else {
            //로그인 안했을 경우에는 회원가입 페이지로 이동
            if($user == null){
                navigate("/register", {
                    replace: true,
                });
                return;
            }
            if(profile.following){
                axios.delete(`/api/profiles/${profile.username}/follow`).then(res => {
                    profile.following = res.data.profile.following;
                });
            } else {
                axios.post(`/api/profiles/${profile.username}/follow`).then(res => {
                    profile.following = res.data.profile.following;
                });
            }
        }
    }
    let buttonHtml = '';
    $: if(myPage) {
        buttonHtml = '<i class="ion-gear-a"></i> Edit Profile Settings';
    } else {
        if(profile.following){
            buttonHtml = '<i class="ion-plus-round"></i> Unfollow ' + profile.username;
        } else {
            buttonHtml = '<i class="ion-plus-round"></i> Follow ' + profile.username;
        }
    }
</script>
<style>
    :global(a){
        cursor: pointer;
    }
</style>


<div class="user-info">
    <div class="container">
        <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} alt="" class="user-img"/>
                <h4>{profile.username}</h4>
                <p>
                    {profile.bio == null ? '' : profile.bio}
                </p>
                <button on:click={followEvent} class="btn btn-sm btn-outline-secondary action-btn">
                    {@html buttonHtml}
                </button>
            </div>

        </div>
    </div>
</div>