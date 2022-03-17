let btnNextHistories = document.querySelector('#btnNextHistories');
let btnPreviusHistories = document.querySelector('#btnPreviusHistories');
let histories = document.querySelector('.histories').children;

let transaleX = 0;

btnNextHistories.addEventListener('click', nextHistories);
btnPreviusHistories.addEventListener('click', previusHistories);

hideBtnHistories(btnPreviusHistories, true);


// Function that allow us to loop to the next block of histories that are not visible
function nextHistories(){
    transaleX += (-320);

    /* Recorremos 4 historias con 320 pixeles a la izquierda, primero ya mostramos las primeras 4 y por eso la restamos
       Por lo tanto hacemos una regla de tres para conocer cuantos pixeles necesitamos para recorrer todas las historias. */
    let historiesLength = histories.length,
        allHistories = (historiesLength * 320) / 4 - 320;

    let saltos = historiesLength / 8,
        saltosHistorias = (8 * Math.trunc(saltos)), //Revisamos la cantidad de historias que se pueden ver en el salto
        missingStories = historiesLength - saltosHistorias,
        limiteDerecho = saltosHistorias * 80;
    
    if( (transaleX - 320) == -limiteDerecho){
        let transaleNewX = -(80 * (8 + missingStories) + 15); //Cada historia son 80px, actualmente podemos ver 8 
        for(let historie of histories){
            historie.style.transform = `translateX(${transaleNewX}px)`;
        }
        hideBtnHistories(btnNextHistories, true);
        return;
    }

    if(!(transaleX <= -(allHistories))){
        for(let historie of histories) historie.style.transform = `translateX(${transaleX}px)`;
    }

    hideBtnHistories(btnPreviusHistories, false);
}

function previusHistories(){
    if(transaleX === 0) return;

    transaleX += 320;

    if(transaleX >= 0){
        transaleX = 0;
        hideBtnHistories(btnPreviusHistories, true);
    }

    hideBtnHistories(btnNextHistories, false);

    for(let historie of histories){
        historie.style.transform = `translateX(${transaleX}px)`;
    }
}

function hideBtnHistories(btn, hide){
    (hide) ? addClass(btn, 'no-display') : removeClass(btn, 'no-display');
}