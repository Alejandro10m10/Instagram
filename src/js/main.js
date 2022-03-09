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
let btnHome = document.querySelector('#btnHome');
let btnHomeIcon = btnHome.children[0];

btnHome.addEventListener('click', showHome );
btnHome.addEventListener('mousedown', () => mousedown(btnHomeIcon));
btnHome.addEventListener('mouseup', () => mouseup(btnHomeIcon));

let btnMessenger = document.querySelector('#btnMessenger');
btnMessenger.addEventListener('click', showMessenger );

function showHome(){
    console.log('Ir a Home');
}

function showMessenger(){
    btnHomeSelected(true);
}

function btnHomeSelected(selected){
    let pathSvgIcon = btnHomeIcon.children[0];

    let iconBtnHome = { 'd': '', 'fill': '', 'stroke': '', 'stroke-linejoin': '', 'stroke-width': '', };

    if(selected){
        console.log('si');
        iconBtnHome['d'] = 'M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z';
        iconBtnHome['fill'] = 'none';
        iconBtnHome['stroke'] = 'black';
        iconBtnHome['stroke-linejoin'] = 'round';
        iconBtnHome['stroke-width'] = '2';
        removeClass(btnHome, 'nav__option-selected');
    } else{
        console.log('no');
        iconBtnHome['d'] = 'M 22 23 h -6.001 a 1 1 0 0 1 -1 -1 v -5.455 a 2.997 2.997 0 1 0 -5.993 0 V 22 a 1 1 0 0 1 -1 1 H 2 a 1 1 0 0 1 -1 -1 V 11.543 a 1.002 1.002 0 0 1 0.31 -0.724 l 10 -9.543 a 1.001 1.001 0 0 1 1.38 0 l 10 9.543 a 1.002 1.002 0 0 1 0.31 0.724 V 22 a 1 1 0 0 1 -1 1 Z';
        iconBtnHome['fill'] = 'black';
        iconBtnHome['stroke'] = 'none';
        iconBtnHome['stroke-linejoin'] = 'none';
        iconBtnHome['stroke-width'] = 'none';
        addClass(btnHome, 'nav__option-selected');
    }

    pathSvgIcon.setAttribute('d', iconBtnHome['d']);
    pathSvgIcon.setAttribute('fill', iconBtnHome['fill']);
    pathSvgIcon.setAttribute('stroke', iconBtnHome['stroke']);
    pathSvgIcon.setAttribute('stroke-linejoin', iconBtnHome['stroke-linejoin']);
    pathSvgIcon.setAttribute('stroke-width', iconBtnHome['stroke-width']);
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
                btnSeeTagsOnPost.addEventListener('mousedown', () => mousedown(iconBtnSeeTagsOnPost));
                btnSeeTagsOnPost.addEventListener('mouseup', () => mouseup(iconBtnSeeTagsOnPost));
            }
        }
    }
}

function mouseup(iconBtnSeeTagsOnPost){ removeClass(iconBtnSeeTagsOnPost, 'mousedown'); }
function mousedown(iconBtnSeeTagsOnPost){ addClass(iconBtnSeeTagsOnPost, 'mousedown');}

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

    if(picPosition === 1) addClass(btnPreviusPost, 'no-display');
    if(picPosition > 1){
        removeClass(btnPreviusPost, 'no-display');
        removeClass(btnNextPost, 'no-display');
    }
    if(picPosition >= picsNumberInPost) addClass(btnNextPost, 'no-display');
}

function removeAddClass(element, classRemove, classAdd){
    addClass(element, classAdd);
    removeClass(element, classRemove);
}

function addClass(element, nameClass) { element.classList.add(nameClass);}   
function removeClass(element, nameClass) { element.classList.remove(nameClass);} 