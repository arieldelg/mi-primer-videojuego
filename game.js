const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');



const startGame = () => {
      let canvasSize;

    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }


    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('heigth', canvasSize);  
    window.innerWidth
}

window.addEventListener('load', startGame);
