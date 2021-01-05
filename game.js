import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeBitesHim, SNAKE_SPEED } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid, snakeTakeAllGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
let win = false;

const gameBoard = document.getElementById('game-board');


function main(currentTime) {
    if (gameOver) {
        if (confirm('GameOver! Try again?'))
            document.location.reload();
        return;
    }
    if (win) {
        if (confirm('You win! Play again?'))
            document.location.reload();
        return;
    }


    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    window.requestAnimationFrame(main);
    if (secondsSinceLastRender < (1 / SNAKE_SPEED)) return;


    lastRenderTime = currentTime;
    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkGameOver();
    checkWin();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkGameOver() {
    gameOver = outsideGrid(getSnakeHead()) || snakeBitesHim();
}

function checkWin() {
    if (snakeTakeAllGrid())
        win = true;
}