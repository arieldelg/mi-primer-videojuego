const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const up = document.getElementById('up');
const left = document.getElementById('left');
const right = document.getElementById('right');
const down = document.getElementById('down');

let canvasSize;
let elementsSize;
/* let positionDoorX; parte de la funcion 1
let positionDoorY; */

const positionPlayer = {
    x: undefined,
    y: undefined
}

const ganaste = {
    x: undefined,
    y: undefined
}

const positionBombas = []


const renderCanvas = () => {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = Math.floor(innerWidth * .5)
    } else {
        canvasSize = Math.floor(innerHeight * .5)
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize); 

    elementsSize = Math.floor(canvasSize / 10) 

    startGame()
}

const startGame = () => {
    console.log({elementsSize, canvasSize})

    game.font = elementsSize + 'px Verdana'
    game.textAlign = '';

    const mapas = maps[0].trim().split('\n')
    const mapRows = mapas.map(element => element.trim())
    //console.log({mapas, mapRows})
    const mapColumn = mapRows.map(e => e.split(''))
    //console.log({mapColumn})
    //con un ciclo forEach
    game.clearRect(0,0, canvasSize, canvasSize)
    mapColumn.forEach((i, iIndex) => {
        i.forEach((j, jIndex) => {
            const emoji = emojis[j]
            const positionX = ((elementsSize ) * jIndex);
            const positionY = ((elementsSize) * (iIndex + 1));
            
           
            
            if(j === 'O') {
                if(!positionPlayer.x && !positionPlayer.y) {
                    positionPlayer.x = positionX;
                    positionPlayer.y = positionY  
                }
                /* positionDoorX = positionX;  parte de la funcion 1
                positionDoorY = positionY */
            } else if(j === 'I') {
                ganaste.x = positionX;
                ganaste.y = positionY 
            } else if (j === 'X') {
                if(positionBombas.length !== positionBombas.length) {
                positionBombas.push({
                    x: positionX,
                    y: positionY
                });
            }
            }
            game.fillText(emoji, positionX, positionY)
        })
    });
    
    movePlayer()
    //con un ciclo for
    /* for (let i = 0; i < mapRows.length; i++) {
        for (let j = 0; j < mapColumn.length; j++) {
            const emojisToPrint = mapColumn[i][j]
            game.fillText(emojis[emojisToPrint], ((elementsSize + 1) * [j]) + 46 ,((elementsSize) * [i]) + 40) 
        }
    }  */
    
}

const pressKey = (event) => {
    const keyup = event.keyCode
    if(keyup === 87) mouseUp();
    else if( keyup === 83) mouseDown();
    else if (keyup === 65) mouseLeft();
    else if (keyup === 68) mouseRight();
} 

const mouseUp = () => {
    //game.clearRect(positionPlayer.x + 7, (positionPlayer.y - elementsSize) + 6, elementsSize, elementsSize * 1.2) con este clearRect es para borrar cuadro por cuadro no el mapa completo, se llamara funcion 1
    if(positionPlayer.y !== elementsSize) {
        positionPlayer.y -=  elementsSize
        startGame()
    } 
    //drawDoor() parte de la funcion 1
}
const mouseDown = () => {
    console.log(positionPlayer.x, positionPlayer.y);
    if (canvasSize === 195) {
        if(positionPlayer.y < canvasSize - elementsSize) {
            positionPlayer.y += elementsSize
            startGame()
        }
    } else if (positionPlayer.y < canvasSize) {
    positionPlayer.y += elementsSize
    startGame()
   }
}
const mouseRight = () => {
    console.log(positionPlayer.x , positionPlayer.y)
    if(canvasSize === 195) {
        if(positionPlayer.x < canvasSize - (elementsSize * 2)) {
            positionPlayer.x += elementsSize
        startGame()
        }
    } else if (positionPlayer.x < canvasSize - elementsSize) {
        positionPlayer.x += elementsSize
        startGame()
    }
}
const mouseLeft = () => {
    if(positionPlayer.x !== 0) {
        positionPlayer.x -= elementsSize
        startGame()
    }
    
}

window.addEventListener('keydown', pressKey);
window.addEventListener('keydown', pressKey);
window.addEventListener('keydown', pressKey);
window.addEventListener('keydown', pressKey);
up.addEventListener('click', mouseUp);
down.addEventListener('click', mouseDown);
right.addEventListener('click', mouseRight);
left.addEventListener('click', mouseLeft);
window.addEventListener('resize', renderCanvas)
window.addEventListener('load', renderCanvas);

const movePlayer = () => {
    if (ganaste.x === positionPlayer.x && ganaste.y === positionPlayer.y) {
        console.log('ganaste')
    }
    game.fillText(emojis['PLAYER'], positionPlayer.x, positionPlayer.y)
    
}

/* 
parte de la funcion 1
const drawDoor = () => {
    console.log('me estoy imprimiendo')
    game.fillText(emojis['O'], positionDoorX, positionDoorY)
} 
*/