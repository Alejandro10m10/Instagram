
init();

function init(){
    /* showInstagramPictures(); uncomment this line until we have the API connected*/ 
}

function showInstagramPictures(){
    let showPictures = new cDg('instagramPicture').view();
}

/* Post carousel */
let btnsNextPost = document.querySelectorAll('.btnNextPost');
let btnsPreviusPost = document.querySelectorAll('.btnPreviusPost');

for(let btnNextPost of btnsNextPost){
    btnNextPost.addEventListener('click', nextPost);
}

for(let btnPreviusPost of btnsPreviusPost){
    btnPreviusPost.addEventListener('click', previusPost);
}


function nextPost(element){
    let postContent = element.path[2].children; //Get the parent element
    let postNav;

    for(elementChild of postContent){
        if(elementChild.classList.contains('post__content__pictures__nav')){
            postNav = elementChild;
        }
    }

    changePost(postNav, postContent, true);
}

function previusPost(element){
    let postContent = element.path[2].children; //Get the parent element
    let postNav;

    for(elementChild of postContent){
        if(elementChild.classList.contains('post__content__pictures__nav')){
            postNav = elementChild;
        }
    }

    changePost(postNav, postContent, false);
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

    for(elementChild of postContent){
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