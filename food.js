import { onSnake, snakeGrows } from './snake.js'
import { randomGridPosition, snakeTakeAllGrid } from './grid.js'

let food = getNewFoodPosition();
const INCREASE_SIZE = 1;

export function update() {
    if (snakeTakeAllGrid()) return;
    if (onSnake(food)) {
        snakeGrows(INCREASE_SIZE);
        food = getNewFoodPosition();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function getNewFoodPosition() {
    let newFoodPosition;

    while (newFoodPosition == null || onSnake(newFoodPosition))
        newFoodPosition = randomGridPosition();
    return newFoodPosition
}

