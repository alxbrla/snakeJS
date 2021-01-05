import { getInputDirection } from './input.js'

export const SNAKE_SPEED = 3;
let snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export function update() {
    addSegments();

    let inputDirection = getInputDirection();
    for (let parse = snakeBody.length - 1; (parse > 0); parse--) {
        snakeBody[parse].x = snakeBody[parse - 1].x;
        snakeBody[parse].y = snakeBody[parse - 1].y;
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}

export function snakeGrows(amount) {
    newSegments += amount;
}

export function onSnake(foodPosition, { ignoreSnakeHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreSnakeHead && index === 0) return false;
        return foodPosition.x === segment.x && foodPosition.y === segment.y
    })
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeBitesHim() {
    return onSnake(snakeBody[0], { ignoreSnakeHead: true });
}

function addSegments() {
    for (; newSegments > 0; newSegments--) {
        let lastSegment = snakeBody[snakeBody.length - 1];
        snakeBody.push({ x: lastSegment.x, y: lastSegment.y });
    }
}