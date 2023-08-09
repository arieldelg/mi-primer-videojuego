const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

const startGame = () => {
    console.log({elementsSize, canvasSize})

    game.font = elementsSize + 'px Verdana'
    game.textAlign = 'end';

    /* crea row y columnas de los mapas */
    

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            game.fillText(emojis['X'], ((elementsSize + 1) * [j]) + 6 ,(elementsSize) * [i]) 
        }
    } 
    
}

const renderCanvas = () => {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = innerWidth * .4608296
    } else {
        canvasSize = innerHeight * .4608296
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize); 

    elementsSize = (canvasSize / 10) -1

    startGame()
}

window.addEventListener('resize', renderCanvas)
window.addEventListener('load', renderCanvas);
