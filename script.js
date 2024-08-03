const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreVal');
const startButton = document.getElementById('startButton');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

let snake = [
    { x: UNIT * 3, y: 0 },
    { x: UNIT * 2, y: 0 },
    { x: UNIT, y: 0 },
    { x: 0, y: 0 }
];
let score = 0;
let xVel = UNIT;
let yVel = 0;
let active = false;
let started = false;
let paused = false;
let foodX;
let foodY;
context.fillStyle = '#212121';
    
    context.fillRect(0,0,WIDTH,HEIGHT);

startButton.addEventListener('click', () => {
    startGame();
    startButton.disabled = true; // Disable button after clicking
});

function startGame() {
    // Initialize game state
    active = true;
    started = true;
    paused = false;
    score = 0;
    snake = [
        { x: UNIT * 3, y: 0 },
        { x: UNIT * 2, y: 0 },
        { x: UNIT, y: 0 },
        { x: 0, y: 0 }
    ];
    xVel = UNIT;
    yVel = 0;
    scoreText.textContent = score;
    
  
    createFood();
  
    nextTick();
}

function clearBoard(){
    context.fillStyle = '#212121';
    
    context.fillRect(0,0,WIDTH,HEIGHT);
}

function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}

function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(foodX,foodY,UNIT,UNIT)
}

function drawSnake(){
    context.fillStyle = 'blue';
    context.strokeStyle = '#212121';
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT)
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xVel,
                    y:snake[0].y+yVel}
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else
        snake.pop();
}

function nextTick() {
    if (active && !paused) {
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        setTimeout(nextTick, 200); // Adjust speed of the game
    } else if (!active) {
       clearBoard();
        context.font = "bold 25px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        
        
        context.fillText("Game Over!!", WIDTH / 2, HEIGHT / 2);
        context.fillText("SCORE : "+score,WIDTH/2,HEIGHT/3);
    }
}

function createFood() {
    foodX = Math.floor(Math.random() * (WIDTH / UNIT)) * UNIT;
    foodY = Math.floor(Math.random() * (HEIGHT / UNIT)) * UNIT;
}

// Other game functions (e.g., clearBoard, displayFood, drawSnake, moveSnake, checkGameOver)

// Keyboard input handling
document.addEventListener('keydown', keyPress);

function keyPress(event){
    if(!started){
        started = true;
        nextTick();
    }
    
    if(event.keyCode===32){
        console.log('clicked')
        if(paused){
            paused = false;
            nextTick();
        }
        else{
            paused = true;
        }
    }
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40

    switch(true){
       
        case(event.keyCode==LEFT  && xVel!=UNIT):
            xVel=-UNIT;
            yVel = 0;
            break;
        
        case(event.keyCode==RIGHT && xVel!=-UNIT):
            xVel=UNIT;
            yVel=0;
            break;
        
        case(event.keyCode==UP && yVel!=UNIT):
            xVel=0;
            yVel=-UNIT;
            break;
       
        case(event.keyCode==DOWN && yVel!=-UNIT):
            xVel=0;
            yVel=UNIT;
            break;

    }
}

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
            active=false;
            break;
    }
}