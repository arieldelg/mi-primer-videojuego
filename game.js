const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const up = document.getElementById('up');
const left = document.getElementById('left');
const right = document.getElementById('right');
const down = document.getElementById('down');
const spanLifes = document.getElementById('vidas');
const spanTime = document.getElementById('time');
const record = document.getElementById('record')
const pResult = document.getElementById('result')

let canvasSize;
let elementsSize;
/* let positionDoorX; parte de la funcion 1
let positionDoorY; */
let level = 0;
let positionBombas = []
let lifes = 3;
let timestart;
let setIntervalGame;


const positionPlayer = {
    x: undefined,
    y: undefined
}

const ganaste = {
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
    positionPlayer.x = undefined
    positionPlayer.y = undefined
    startGame()
}

const startGame = () => {
    console.log({elementsSize, canvasSize})
    positionBombas = []
    game.font = elementsSize + 'px Verdana'
    game.textAlign = '';

    let mapas = maps[level]
    
    if (!mapas) {
        return gameWin()
    }

    if (!timestart) {
        timestart = Date.now()
        setIntervalGame = setInterval(showTime, 100)
        recordTime()
    }

    mostrarVidas()

    const newMaps = mapas.trim().split('\n')
    const mapRows = newMaps.map(element => element.trim())
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
                if(positionBombas) {
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
        levelUp ()
    }

    /* const checarColisionBomba = positionBombas.find(element => {  es una manera de checar collision con las bombas con metodo to find
        const bombasX = element.x.toFixed(3) === positionPlayer.x.toFixed(3);
        const bombasY = element.y.toFixed(3) === positionPlayer.y.toFixed(3);
        return bombasX && bombasY;
    })

    if (checarColisionBomba) {
        console.log('perdiste')
    } */
     checarColisionBomba() 
    game.fillText(emojis['PLAYER'], positionPlayer.x, positionPlayer.y);
}

const checarColisionBomba = () => {
    const bomba = positionBombas.find(element => {
        const collissionX = element.x == positionPlayer.x;
        const collisionY = element.y == positionPlayer.y
        return collissionX && collisionY
    })
    if(bomba) {
        //console.log('perdiste');
        gameEnd()
    }
} 

const levelUp = () => {
    level++
    startGame()
}

const gameWin = () => {
    clearInterval(setIntervalGame);

    const record = localStorage.getItem('recordTime');
    const playerTime = Date.now() - timestart;

    if (record) {
        if (playerTime <= record) {
            pResult.innerHTML = 'superaste el record';
            localStorage.setItem('recordTime', playerTime);
        } else {
            pResult.innerHTML = 'No superaste el record';
        }
    } else {
        localStorage.setItem('recordTime', playerTime);
    }
    console.log({record, playerTime})
    
    window.location.reload()
}

const gameEnd = () => {
    lifes--

    if(lifes <= 0) {
        lifes = 3
        level = 0
        clearInterval(setIntervalGame)
        timestart = undefined
    }
    positionPlayer.x = undefined
    positionPlayer.y = undefined
    startGame()
    /* window.location.reload() */
}

const mostrarVidas = () => {
    const lifesArray = Array(lifes).fill(emojis['HEART'])
    spanLifes.innerHTML = ''
    lifesArray.forEach(element => spanLifes.innerHTML += element)
}

const showTime = () => {
 spanTime.innerHTML = Date.now() - timestart
}

const recordTime = () => {
    record.innerHTML = localStorage.getItem('recordTime');
}

/* 
parte de la funcion 1
const drawDoor = () => {
    console.log('me estoy imprimiendo')
    game.fillText(emojis['O'], positionDoorX, positionDoorY)
} 
*/