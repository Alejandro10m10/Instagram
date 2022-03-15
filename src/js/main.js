/* Show Tags on Posts */
let tagsOnPosts = document.querySelectorAll('.tagOnPosts');

/* Videos */
let videos = document.querySelectorAll('.postVideo');

init();

function init(){
    /* showInstagramPictures(); uncomment this line until we have the API connected*/ 
    initTagsOnPosts();
}

function showInstagramPictures(){
    let showPictures = new cDg('instagramPicture').view();
}

/* Navigator */

// Home button
let btnHome = document.querySelector('#btnHome'),
    iconBtnHomeSelected = document.querySelector('#iconBtnHomeSelected'),
    iconBtnHomeDeselected = document.querySelector('#iconBtnHomeDeselected');

btnHome.addEventListener('click', showHome );
addEventMouseDownUp(btnHome, iconBtnHomeSelected);
addEventMouseDownUp(btnHome, iconBtnHomeDeselected);

// Messenger button
let btnMessenger = document.querySelector('#btnMessenger'),
    iconBtnMessengerSelected = document.querySelector('#iconBtnMessengerSelected'),
    iconBtnMessengerDeselected = document.querySelector('#iconBtnMessengerDeselected');
    
btnMessenger.addEventListener('click', showMessenger );
addEventMouseDownUp(btnMessenger, iconBtnMessengerSelected);
addEventMouseDownUp(btnMessenger, iconBtnMessengerDeselected);

// Find People button
let btnFindPeople = document.querySelector('#btnFindPeople'),
    iconBtnFindPeopleSelected = document.querySelector('#iconBtnFindPeopleSelected'),
    iconBtnFindPeopleDeselected = document.querySelector('#iconBtnFindPeopleDeselected');
    
btnFindPeople.addEventListener('click', showFindPeople );
addEventMouseDownUp(btnFindPeople, iconBtnFindPeopleSelected);
addEventMouseDownUp(btnFindPeople, iconBtnFindPeopleDeselected);

// Activity Feed button
let btnActivityFeed = document.querySelector('#btnActivityFeed'),
    iconBtnActivityFeedSelected = document.querySelector('#iconBtnActivityFeedSelected'),
    iconBtnActivityFeedDeselected = document.querySelector('#iconBtnActivityFeedDeselected');
    
btnActivityFeed.addEventListener('click', ()=> showActivityFeed(true) );
addEventMouseDownUp(btnActivityFeed, iconBtnActivityFeedSelected);
addEventMouseDownUp(btnActivityFeed, iconBtnActivityFeedDeselected);

/* Activity Feed content */
let activityFeedContent = document.querySelector('.activity-feed'),
    closeActivityFeedContent = document.querySelector('.activity-feed__background');

closeActivityFeedContent.addEventListener('click', ()=> showActivityFeed(false));

// User menu button
let btnUserMenu = document.querySelector('#btnUserMenu');
btnUserMenu.addEventListener('click', ()=> showUserMenu(true) );

// User menu content
let menuUserContent = document.querySelector('.menu-user'),
    closeMenuUserContent = document.querySelector('.menu-user__background');

closeMenuUserContent.addEventListener('click', ()=> showUserMenu(false));

/* Create new post content */
let btnNewPost = document.querySelector('#btnNewPost'),
    createNewPostContent = document.querySelector('.create-post'),
    btnCloseCreatePost = document.querySelector('#btnCloseCreatePost'),
    closeCreatePostBackground = document.querySelector('.create-post__background'),
    body = document.querySelector('body');;
btnNewPost.addEventListener('click', ()=> showCreateNewPost(true) );
btnCloseCreatePost.addEventListener('click', ()=> showCreateNewPost(false) );
closeCreatePostBackground.addEventListener('click', ()=> showCreateNewPost(false) );


function addEventMouseDownUp(element, icon){
    element.addEventListener('mousedown', () => mousedown(icon));
    element.addEventListener('mouseup', () => mouseup(icon));
}

function showHome(){
    btnHomeSelected(true);
    btnMessengerSelected(false);
    btnFindPeopleSelected(false);
    btnActivityFeedSelected(false);
    btnUserMenuSelected(false);
}

function showMessenger(){
    btnHomeSelected(false);
    btnMessengerSelected(true);
    btnFindPeopleSelected(false);
    btnActivityFeedSelected(false);
    btnUserMenuSelected(false);
}

function showFindPeople(){
    btnHomeSelected(false);
    btnMessengerSelected(false);
    btnFindPeopleSelected(true);
    btnActivityFeedSelected(false);
    btnUserMenuSelected(false);
}

function showIconUserMenu(){
    btnHomeSelected(false);
    btnMessengerSelected(false);
    btnFindPeopleSelected(false);
    btnActivityFeedSelected(false);
    btnUserMenuSelected(true);
}

function showIconActivityFeed(){
    btnHomeSelected(false);
    btnMessengerSelected(false);
    btnFindPeopleSelected(false);
    btnActivityFeedSelected(true);
    btnUserMenuSelected(false);
}

function showUserMenu(selected){
    if(selected){
        showIconUserMenu();
        removeClass(menuUserContent, 'no-display');
    } else{
        addClass(menuUserContent, 'no-display');
        showHome();
    }
}

function showActivityFeed(selected){
    if(selected){
        showIconActivityFeed();
        removeClass(activityFeedContent, 'no-display');
    } else{
        addClass(activityFeedContent, 'no-display');
        showHome();
    }
}

/* Variables that allow us to save the position of the scroll and change it */
let scrrollOntop;
let doc = document.documentElement;
function showCreateNewPost(selected){
    if(selected){
        scrrollOntop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        removeClass(createNewPostContent, 'no-display');
        addClass(body, 'no-show-scroll');
    } else{
        addClass(createNewPostContent, 'no-display');
        removeClass(body, 'no-show-scroll');
    }
    doc.scrollTop = scrrollOntop;
}

function btnUserMenuSelected(selected){
    (selected)
        ? removeAddClass(btnUserMenu, 'img__histories__no-outline', 'img__histories__outline')
        : removeAddClass(btnUserMenu, 'img__histories__outline', 'img__histories__no-outline');
}

function btnActivityFeedSelected(selected){
    displayHideElements(selected, iconBtnActivityFeedSelected, iconBtnActivityFeedDeselected);
}

function btnFindPeopleSelected(selected){
    displayHideElements(selected, iconBtnFindPeopleSelected, iconBtnFindPeopleDeselected);
}

function btnMessengerSelected(selected){
    displayHideElements(selected, iconBtnMessengerSelected, iconBtnMessengerDeselected);
}

function btnHomeSelected(selected){
    displayHideElements(selected, iconBtnHomeSelected, iconBtnHomeDeselected);
}

function displayHideElements(option, showElement, hideElement){
    if(option){
        removeClass(showElement, 'no-display');
        addClass(hideElement, 'no-display');
    } else{
        addClass(showElement, 'no-display');
        removeClass(hideElement, 'no-display');
    }
}

/* Videos */
for(let video of videos){
    video.addEventListener('click', () => pausePlayVideo(video) );

    let videoContainer = video.parentElement;
    let videoContainerChildren = videoContainer.children;

    for(let i = 0; i < videoContainerChildren.length ; i++){
        if(videoContainerChildren[i].classList.contains('btnVideoAudio')){
            let btnVideoAudio = videoContainerChildren[i];
            btnVideoAudio.addEventListener('click', () => pausePlayAudio(video, btnVideoAudio));
        }
    }
}

function pausePlayAudio(video, btnVideoAudio){
    let iconAudioPlaying = btnVideoAudio.children[0];
    let iconAudioMuted = btnVideoAudio.children[1];

    if(iconAudioMuted.classList.contains('no-display')){
        removeClass(iconAudioMuted, 'no-display');
        addClass(iconAudioPlaying, 'no-display');
        video.muted = true;
    } else{
        addClass(iconAudioMuted, 'no-display');
        removeClass(iconAudioPlaying, 'no-display');
        video.muted = false;
    }
}

function pausePlayVideo(video){
    let videoContainer = video.parentElement;
    let videoContainerChildren = videoContainer.children;

    for(let i = 0; i < videoContainerChildren.length ; i++){
        let videoElement = videoContainerChildren[i];
        if(videoElement.classList.contains('postVideo__controls')){
            if(videoElement.classList.contains('no-display')){
                removeClass(videoElement, 'no-display');
                video.pause();
            } else{
                addClass(videoElement, 'no-display');
                video.play();
            }
        }
    }
}

/* Play the video when it is displayed on the screen when the user scrolls the page */
window.onscroll = function () {
    for(let video of videos) observer.observe(video); // Observar los videos
};

// Crear el observador (Intersection Observer API). En la función anónima se recibe una lista de entradas
observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { // Recorrer las entradas recibidas
        let currentVideo = entry.target; // entry.target es el elemento que se está observando
        let videoContainer = currentVideo.parentElement;
        let playVideo = true;
        let videoContainerChildren = videoContainer.children;
        
        for(let videoContainerChild of videoContainerChildren){            
            if(videoContainerChild.classList.contains('postVideo__controls')){
                (videoContainerChild.classList.contains('no-display'))
                    ? playVideo = true
                    : playVideo = false;
            }   
        }

        if (entry.intersectionRatio > 0) { // Está visible en el viewport
            if(playVideo) currentVideo.play();
            observer.unobserve(entry.target); // Dejar de observar
        } else{
            if(playVideo) currentVideo.load();
        }
    });
});



/* Show Tags on Posts */
function initTagsOnPosts(){
    for(let tagOnPost of tagsOnPosts){
        let pictureContent = tagOnPost.parentElement;
        setCursorOnPicturesTags(pictureContent);
    
        pictureContent.addEventListener('click', () => showTagsOnPicture(pictureContent));
        let pictureContentChildren = pictureContent.children;
        for(let i = 0 ; i < pictureContentChildren.length ; i++){
            if(pictureContentChildren[i].classList.contains('btnSeeTagsOnPost')){
                let btnSeeTagsOnPost = pictureContentChildren[i];
                let iconBtnSeeTagsOnPost = btnSeeTagsOnPost.children[0];
                addEventMouseDownUp(btnSeeTagsOnPost, iconBtnSeeTagsOnPost);
            }
        }
    }
}

function mouseup(element){ removeClass(element, 'mousedown'); }
function mousedown(element){ addClass(element, 'mousedown');}

function showTagsOnPicture(pictureContent){
    let pictureContentChildren = pictureContent.children;
    let tagOnPostsContent;

    for(let i = 0 ; i < pictureContentChildren.length ; i++){
        if(pictureContentChildren[i].classList.contains('tagOnPosts')){
            tagOnPostsContent = pictureContentChildren[i];
            if(tagOnPostsContent.classList.contains('no-display')){
                removeClass(tagOnPostsContent, 'no-display');
            } else{
                addClass(tagOnPostsContent, 'no-display');
            }
        }
    }
}

function setCursorOnPicturesTags(post){
    post.classList.add('post__withTags');
}


/* Post carousel */
let btnsNextPost = document.querySelectorAll('.btnNextPost');
let btnsPreviusPost = document.querySelectorAll('.btnPreviusPost');

for(let btnNextPost of btnsNextPost){
    btnNextPost.addEventListener('click', (e) => nextPreviusPost(e, true)); // true - next post  |  false - previus post 
}

for(let btnPreviusPost of btnsPreviusPost){
    btnPreviusPost.addEventListener('click', (e) => nextPreviusPost(e, false));
}

function nextPreviusPost(element, change){
    let postContent = element.path[2].children; //Get the parent element
    let postNav;

    for(let elementChild of postContent){
        if(elementChild.classList.contains('post__content__pictures__nav')){
            postNav = elementChild;
        }
    }

    changePost(postNav, postContent, change);
}

function changePost(post, postContent, change){ // Change = true - next post  |  Change = false - previus post 
    let picturesInPost = post.children,
        picsNumberInPost = picturesInPost.length,
        currentPic, nextPic,
        picPosition;

    for(let i = 0 ; i < picsNumberInPost ; i++){
        if(picturesInPost[i].classList.contains('currentPicture')){
            currentPic = picturesInPost[i];
            
            if((i + 1) <= picsNumberInPost ) {
                if(change){
                    nextPic = picturesInPost[i + 1];
                    picPosition = i + 2;
                } else{
                    nextPic = picturesInPost[i - 1];
                    picPosition = i;
                }
            } else{
                return;
            }
        }
    }

    showNextPreviusButton(postContent, picPosition, picsNumberInPost);
    removeAddClass(currentPic, 'currentPicture', 'no-display');
    removeAddClass(nextPic, 'no-display', 'currentPicture');

}

function showNextPreviusButton(postContent, picPosition, picsNumberInPost){
    if(picPosition === 0) return;

    let btnPreviusPost, btnNextPost;

    for(let elementChild of postContent){
        if(elementChild.classList.contains('btnPreviusPost')) btnPreviusPost = elementChild;
        if(elementChild.classList.contains('btnNextPost')) btnNextPost = elementChild;
    }

    if(picPosition === 1) {
        addClass(btnPreviusPost, 'no-display');
        removeClass(btnNextPost, 'no-display');
    }
    if(picPosition > 1){
        removeClass(btnPreviusPost, 'no-display');
        removeClass(btnNextPost, 'no-display');
    }
    if(picPosition >= picsNumberInPost) addClass(btnNextPost, 'no-display');

    slideDotsContent = postContent[3];

    showCurrentSlideDot(slideDotsContent, (picPosition - 1 ));
}

function removeAddClass(element, classRemove, classAdd){
    addClass(element, classAdd);
    removeClass(element, classRemove);
}

function addClass(element, nameClass) { element.classList.add(nameClass);}   
function removeClass(element, nameClass) { element.classList.remove(nameClass);} 

/* Show slide-dots on posts */
let allPosts = document.querySelectorAll('.post__content__pictures__nav');
let currentSlide = 0;

for(let posts of allPosts){
    let postsNumber = posts.children.length;
    if(postsNumber > 1){
        showSlideDotsOnPost(posts, postsNumber);
    }
}

function showSlideDotsOnPost(posts, postsNumber){
    let postContainer = posts.parentElement;
    postContainer.appendChild(createSlideDotsElement(postsNumber));
}

function createSlideDotsElement(dotsNumber){
    let slideDotsContent = document.createElement("div");
    addClass(slideDotsContent, 'post__content__pictures__slide-dots');
    
    for(let i = 0; i < dotsNumber ; i++){
        let dot = document.createElement("span");
        addClass(dot, 'dot');
        if(i === currentSlide){
            addClass(dot, 'currentSlide');
        }
        slideDotsContent.appendChild(dot);
    }

    return slideDotsContent;
}

function showCurrentSlideDot(slideDotsElement, dotPosition){
    let slideDotsElements = slideDotsElement.children;

    for(let i = 0 ; i < slideDotsElements.length ; i++){
        (i === dotPosition) 
            ? addClass(slideDotsElements[i], 'currentSlide')
            : removeClass(slideDotsElements[i], 'currentSlide');
    }
}