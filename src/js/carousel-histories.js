let btnNextHistories = document.querySelector('#btnNextHistories');
let btnPreviusHistories = document.querySelector('#btnPreviusHistories');
let histories = document.querySelector('.histories').children;

let transaleX = 0;

btnNextHistories.addEventListener('click', nextHistories);
btnPreviusHistories.addEventListener('click', previusHistories);


// Function that allow us to loop to the next block of histories that are not visible
function nextHistories(){
    transaleX += (-320);
    /* Recorremos 4 historias con 320 pixeles a la izquierda, primero ya mostramos las primeras 4 y por eso la restamos
       Por lo tanto hacemos una regla de tres para conocer cuantos pixeles necesitamos para recorrer todas las historias. */
    allHistories = (histories.length * 320) / 4 - 320;

    let saltos = histories.length / 8;
    let missingStories = histories.length - (8 * Math.trunc(saltos));
    let saltosRestantes = (8 * Math.trunc(saltos)) * 80;

    if(transaleX - 320 == -saltosRestantes){
        transaleX = -(80 * (8 + missingStories) + 15);
        for(let historie of histories){
            historie.style.transform = `translateX(${transaleX}px)`;
        }
        hideBtnNextHistories();
        return;
    }

    if(!(transaleX <= -(allHistories))){
        for(let historie of histories) historie.style.transform = `translateX(${transaleX}px)`;
    }
}

function previusHistories(){
    if(transaleX === 0) return;
    transaleX += 320;
    for(let historie of histories){
        historie.style.transform = `translateX(${transaleX}px)`;
    }
}

function hideBtnNextHistories(){
    addClass(btnNextHistories, 'no-display');
}