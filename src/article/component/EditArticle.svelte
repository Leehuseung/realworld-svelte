<script>
    import {currentMenu, noImage, user} from "../../common/js/store";
    import {useNavigate, useParams} from "svelte-navigator";
    import axios from "axios";

    const navigate = useNavigate();
    $currentMenu = 'editor';

    const params = useParams();
    let slug = $params.slug;
    let isUpdate = typeof slug !== 'undefined';

    let validateHtml = '';
    let isDisable = false;
    let article = {
        'title' : '',
        'description' : '',
        'body' : '',
        'tagList' : []
    }
    let tagName = '';

    if(isUpdate){
        axios.get(`/api/articles/${slug}`).then(res => {
            article = res.data.article;
        });
    }

    let validateArticle = (article) => {
        if(article.title === ''){
            validateHtml = '<li>title can\'t be blank</li>'
            return false;
        }
        if(article.description === ''){
            validateHtml = '<li>description can\'t be blank</li>'
            return false;
        }
        if(article.body === ''){
            validateHtml = '<li>body can\'t be blank</li>'
            return false;
        }
        return true;
    }

    let keyPress = e => {
        if(e.charCode === 13){
            tagName = tagName.trim();
            if(tagName !== '' && article.tagList.indexOf(tagName) === -1){
                article.tagList.push(tagName);
                article.tagList = article.tagList;
                tagName = '';
            }
        }
    }

    let removeTag = param => {
        return e => {
            article.tagList.splice(article.tagList.indexOf(param),1);
            article.tagList = article.tagList;
        }
    }

    let articleErrorHandle = (error) => {
        isDisable = false;
        let data = error.response.data.errors;
        if(Object.keys(data)[0] === 'article'){
            validateHtml =  '<li>title must be unique</li>';
        }
    }

    let publishArticle = () => {
        if(validateArticle(article)){
            isDisable = true;
            if(isUpdate){
                axios.put(`/api/articles/${slug}`,JSON.stringify({
                    'article' : article
                })).then(res => {
                    navigate(`/article/${res.data.article.slug}`, {
                        replace: true,
                    });
                }).catch(articleErrorHandle);
            } else {
                axios.post('/api/articles',JSON.stringify({
                    'article' : article
                })).then(res => {
                    navigate(`/article/${res.data.article.slug}`, {
                        replace: true,
                    });
                }).catch(articleErrorHandle);
            }
        }
    }


</script>

<div class="editor-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
                <ul class="error-messages">
                    {@html validateHtml}
                </ul>
                <fieldset disabled="{isDisable}">
                    <fieldset class="form-group">
                        <input bind:value={article.title} type="text" class="form-control form-control-lg" placeholder="Article Title">
                    </fieldset>
                    <fieldset class="form-group">
                        <input bind:value={article.description}  type="text" class="form-control" placeholder="What's this article about?">
                    </fieldset>
                    <fieldset class="form-group">
                        <textarea bind:value={article.body}  class="form-control" rows="8"
                                  placeholder="Write your article (in markdown)"></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                        <input bind:value={tagName} on:keypress={keyPress} type="text" class="form-control" placeholder="Enter tags">
                        <div class="tag-list">
                            {#each article.tagList as tag}
                                <span on:click={removeTag(tag)} class="tag-default tag-pill">
                                    <i class="ion-close-round"></i>
                                    {tag}
                                </span>
                            {/each}
                        </div>
                    </fieldset>
                    <button on:click={publishArticle} class="btn btn-lg pull-xs-right btn-primary" type="button">
                        Publish Article
                    </button>
                </fieldset>
            </div>

        </div>
    </div>
</div>
