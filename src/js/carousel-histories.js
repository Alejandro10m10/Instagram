let btnNextHistories = document.querySelector('#btnNextHistories');
let btnPreviusHistories = document.querySelector('#btnPreviusHistories');
let histories = document.querySelector('.histories').children;

let transaleX = 0;

btnNextHistories.addEventListener('click', nextHistories);
btnPreviusHistories.addEventListener('click', previusHistories);

// Function that allow us to loop to the next block of histories that are not visible
function nextHistories(){
    transaleX += (-320);
    for(let historie of histories){
        historie.style.transform = `translateX(${transaleX}px)`;
    }
}

function previusHistories(){
    if(transaleX === 0) return;
    transaleX += 320;
    for(let historie of histories){
        historie.style.transform = `translateX(${transaleX}px)`;
    }
}