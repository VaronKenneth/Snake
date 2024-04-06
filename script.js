// HTML element

const board = document.getElementById("board");
const scoreBoard = document.getElementById("scoreBoard");
const startButton = document.getElementById("start");
const gameOverSing = document.getElementById("gameOver");

// Primero creamos las variables a utilizar 


// Game settings

const boardSize = 10;
const gameSpeed = 100;
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2,
};
const directions = {
    arrowUp: -10,
    arrowDown: 10,
    arrowRigth: 1,
    arrowLeft: -1
};

// Game variables

let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

const drawSnake = () => {
    snake.forEach( square => drawSquare(square, 'snakeSquare'));
};

// Rellenar cada cuadro del tablero
// @params
// square: posicion del cuadrado
//type: tipo de cuadarado (empty, food, snake)

const drawSquare = (square, type) => {
    const [ row, column ] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    if(type === 'emptySquare') {
        emptySquares.push(square);
    } else {
        if(emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
};

const updateScore = ()=> {
    scoreBoard.innerText = score;
}

const createBoard = () => {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach( (colum, columIndex) => {
            const squareValue = `${rowIndex},${columIndex}`; // Muestra el valor que se itero (donde se encuentra la culebra ej. 00, 01... 99)
            const squareElement = document.createElement("div");
            squareElement.setAttribute("class", "square emptySquare");
            squareElement.setAttribute("id", squareValue);
            board.appendChild(squareElement); // Esto porque es para que cuando se pierda y se vuelva a iniciar todo este bien
            emptySquares.push(squareValue);
        })
    }) 
};
const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
};

// Array.from(Array(boardSize)), crea un array del tamaño del tablero (10)
//  () => new Array(boardSize).fill(squareTypes.emptySquare); // a cada array ya creado le crea un array de 10 valores

const startGame = () => {
    setGame();
    gameOverSing.style.display = 'none';
    startButton.disabled = true;
    drawSnake();
    updateScore();
    createRandomFood();
};


startButton.addEventListener(`click`, startGame); 