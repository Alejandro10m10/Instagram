
init();

function init(){
    /* showInstagramPictures(); uncomment this line until we have the API connected*/ 
}

function showInstagramPictures(){
    let showPictures = new cDg('instagramPicture').view();
}

/* Post carousel */
btnsNextPost = document.querySelectorAll('.btnNextPost');

for(btnNextPost of btnsNextPost){
    btnNextPost.addEventListener('click', nextPost);
}

function nextPost(element){
    let postContent = element.path[2].children; //Get the parent element
    let postNav;

    for(elementChild of postContent){
        if(elementChild.classList.contains('post__content__pictures__nav')){
            postNav = elementChild;
        }
    }

    changePost(postNav, postContent);
}

function changePost(post, postContent){
    let picturesInPost = post.children;
    let picsNumberInPost = picturesInPost.length;
    let currentPic, nextPic;
    let picPosition;

    for(let i = 0 ; i < picsNumberInPost ; i++){
        if(picturesInPost[i].classList.contains('currentPicture')){
            currentPic = picturesInPost[i];
            picPosition = i + 2;
            if((i + 1) < picsNumberInPost ) {
                nextPic = picturesInPost[i + 1];
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
    let btnPreviusPost;
    let btnNextPost;

    for(elementChild of postContent){
        if(elementChild.classList.contains('btnPreviusPost')){
            btnPreviusPost = elementChild;
        }
        if(elementChild.classList.contains('btnNextPost')){
            btnNextPost = elementChild;
        }
    }

    if(picPosition > 1){
        removeClass(btnPreviusPost, 'no-display');
    }
    if(picPosition >= picsNumberInPost){
        addClass(btnNextPost, 'no-display');
    }
}

function removeAddClass(element, classRemove, classAdd){
    addClass(element, classAdd);
    removeClass(element, classRemove);
}

function addClass(element, nameClass) { element.classList.add(nameClass);}   
function removeClass(element, nameClass) { element.classList.remove(nameClass);} 