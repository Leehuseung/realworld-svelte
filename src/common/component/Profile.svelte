<script>
    import {currentMenu, user} from "../js/store";
    import { useParams } from "svelte-navigator";
    import { useNavigate } from "svelte-navigator";
    import {noImage} from "../js/store";
    import axios from "axios";
    import ProfileDetail from "./ProfileDetail.svelte";
    const navigate = useNavigate();

    $currentMenu = '@profile';

    const params = useParams();
    let username = $params.username;

    let profile = {
        'username' : null,
        'image' : null,
        'bio' : null,
        'following' : null,
    }

    let myPage = false;
    user.subscribe(user => {
        if(user != null && user.username == username){
            myPage = true;
        }
    });

    axios.get('/api/profiles/' + username).then(res => {
        profile = res.data.profile;
        if(profile.image === null || profile.image === ""){
            profile.image = $noImage;
        }
    }).catch(error => {
        navigate("/", {
            replace: true,
        });
    });


</script>

<div class="profile-page">

    <ProfileDetail profile="{profile}" myPage="{myPage}"/>

    <div class="container">
        <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                    <ul class="nav nav-pills outline-active">
                        <li class="nav-item">
                            <a class="nav-link active" href="{null}">My Articles</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{null}">Favorited Articles</a>
                        </li>
                    </ul>
                </div>

                <div class="article-preview">
                    <div class="article-meta">
                        <a href="{null}"><img src="http://i.imgur.com/Qr71crq.jpg" alt=""/></a>
                        <div class="info">
                            <a href="{null}" class="author">Eric Simons</a>
                            <span class="date">January 20th</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm pull-xs-right">
                            <i class="ion-heart"></i> 29
                        </button>
                    </div>
                    <a href="{null}" class="preview-link">
                        <h1>How to build webapps that scale</h1>
                        <p>This is the description for the post.</p>
                        <span>Read more...</span>
                    </a>
                </div>

                <div class="article-preview">
                    <div class="article-meta">
                        <a href="{null}"><img src="http://i.imgur.com/N4VcUeJ.jpg" alt=""/></a>
                        <div class="info">
                            <a href="{null}" class="author">Albert Pai</a>
                            <span class="date">January 20th</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm pull-xs-right">
                            <i class="ion-heart"></i> 32
                        </button>
                    </div>
                    <a href="{null}" class="preview-link">
                        <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                        <p>This is the description for the post.</p>
                        <span>Read more...</span>
                        <ul class="tag-list">
                            <li class="tag-default tag-pill tag-outline">Music</li>
                            <li class="tag-default tag-pill tag-outline">Song</li>
                        </ul>
                    </a>
                </div>


            </div>

        </div>
    </div>

</div>