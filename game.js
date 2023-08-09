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
            game.fillText(emoji, positionX, positionY)
            
            if(j === 'O') {
                if(!positionPlayer.x && !positionPlayer.y) {
                    positionPlayer.x = positionX;
                    positionPlayer.y = positionY  
                }
                /* positionDoorX = positionX;  parte de la funcion 1
                positionDoorY = positionY */
            }
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
    } else {
        console.log('ya no puedes seguirle',positionPlayer.y ) 
    }
    //drawDoor() parte de la funcion 1
}
const mouseDown = () => {
   console.log(positionPlayer.y)
   if(positionPlayer.y !== canvasSize) {
    positionPlayer.y += elementsSize
    startGame()
   }
    
}
const mouseRight = () => {
    positionPlayer.x += elementsSize
    startGame()
}
const mouseLeft = () => {
    positionPlayer.x -= elementsSize
    startGame()
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
    game.fillText(emojis['PLAYER'], positionPlayer.x, positionPlayer.y)
}

/* 
parte de la funcion 1
const drawDoor = () => {
    console.log('me estoy imprimiendo')
    game.fillText(emojis['O'], positionDoorX, positionDoorY)
} 
*/