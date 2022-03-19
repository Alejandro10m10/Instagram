let btnNextHistories = document.querySelector('#btnNextHistories');
let btnPreviusHistories = document.querySelector('#btnPreviusHistories');

let transaleX = 0,
    transitionAnimation = 320;

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

    changeHistoriesPosition(true);
    for(let historie of histories) {
        setAnimation(historie, removeAnimation);             
    }

    // Si las historias son exactas es decir van de 8 en 8
    let newTransaleX;
    if(transaleX - 640 === -limiteDerecho && missingStories === 0){
        newTransaleX = 640 - (missingStories * 80) - 10;
        for(let historie of histories){
            historie.style.transform = `translateX(${transaleX - 640 + newTransaleX}px)`;
        }
        hideBtnHistories(btnNextHistories, true);
        return;
    }

    if( (transaleX - 320) == -limiteDerecho){
        newTransaleX = 320 - (missingStories * 80) - 10;
        for(let historie of histories){
            historie.style.transform = `translateX(${transaleX + newTransaleX}px)`;
        }
        hideBtnHistories(btnNextHistories, true);
        return;
    }

    if(!(transaleX <= -(allHistories))){
        for(let historie of histories) {
            historie.style.transform = `translateX(${transaleX}px)`;
        }
    }

}

function changeHistoriesPosition(direction){

    if(direction){
        if(transitionAnimation == 320){
            document.documentElement.style.setProperty('--animationBefore', `-${0}px`);
            document.documentElement.style.setProperty('--animationAfter', `-${320}px`);
        } else{
            document.documentElement.style.setProperty('--animationBefore', `-${transitionAnimation - 320}px`);
            document.documentElement.style.setProperty('--animationAfter', `-${transitionAnimation}px`);
        }
        transitionAnimation += 320;

        hideBtnHistories(btnPreviusHistories, false);
    } else{
        transitionAnimation -= 320;
        document.documentElement.style.setProperty('--animationBefore', `-${transitionAnimation}px`);
        document.documentElement.style.setProperty('--animationAfter', `-${(transitionAnimation - 320) }px`);
    }

    btnNextHistories.disabled = true;
    btnPreviusHistories.disabled = true;
    setTimeout( function (){
        btnNextHistories.disabled = false;
        btnPreviusHistories.disabled = false;
    }, 505);
}

function previusHistories(){
    if(transaleX === 0) return;

    transaleX += 320;

    if(transaleX >= 0){
        transaleX = 0;
        hideBtnHistories(btnPreviusHistories, true);
    }

    hideBtnHistories(btnNextHistories, false);

    changeHistoriesPosition(false);
    for(let historie of histories){
        historie.style.transform = `translateX(${transaleX}px)`;
        setAnimation(historie, removeAnimation);    
    }
}

let intervalID;
function setAnimation(element, myCallBack){
    addClass(element, 'animation');
    intervalID = setTimeout(myCallBack, 505, element);
}

function removeAnimation(element){
    removeClass(element, 'animation');
}

function hideBtnHistories(btn, hide){
    (hide) ? addClass(btn, 'no-display') : removeClass(btn, 'no-display');
}
