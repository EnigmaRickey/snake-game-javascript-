//game constants
let inputDir = { x: 0, y: 0 }
const foodSound = new Audio('music/food.mp3')
const gameoverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
const gameMusic = new Audio('music/music.mp3')
const board = document.getElementById('board')
var scorebox = document.getElementById("scorebox")
var highscorebox = document.getElementById("highscorebox")


let frameSpeed = 15
let lastRenderTime = 0
let snakeArr = [
    { x: 13, y: 15 }
]
let score = 0
let a = 2
let b = 22
let food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }


//game functions
function fps(current_time) {
    window.requestAnimationFrame(fps)
    if ((current_time - lastRenderTime) / 1000 < 1 / frameSpeed) {
        return
    }
    lastRenderTime = current_time
    gameEngine()

}
function collided(snake) {
    if (snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y >= 25 || snake[0].y <= 0) {

        return true;
    }

}
function gameEngine() {
    if (collided(snakeArr)) {
        gameoverSound.play()
        inputDir = { x: 0, y: 0 }

        alert("Game Over, press space bar to restart!")
        snakeArr = [{ x: 13, y: 15 }]
        score = 0
        scorebox.innerHTML = "Score: " + score



    }
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        foodSound.play()
        score += 1
        if (score > hiscorevalue) {
            hiscorevalue = score
            localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
            highscorebox.innerHTML = "High Score: " + hiscorevalue
        }
        scorebox.innerHTML = "Score: " + score;
        let a = 2
        let b = 22
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //for snake movement
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("snakeBody")
        }
        board.append(snakeElement)


    })
    foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add("food")
    board.append(foodElement)

}

//main logic 
let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    hiscorevalue = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscorevalue))
}
else {
    hiscorevalue = JSON.parse(hiscore);
    highscorebox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(fps)
window.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play()
    switch (e.key) {
        case "w":

            inputDir.x = 0
            inputDir.y = -1
            break;
        case "ArrowUp":

            inputDir.x = 0
            inputDir.y = -1
            break;
        case "s":

            inputDir.x = 0
            inputDir.y = +1
            break
        case "ArrowDown":

            inputDir.x = 0
            inputDir.y = +1
            break
        case "a":

            inputDir.x = -1
            inputDir.y = 0
            break
        case "ArrowLeft":

            inputDir.x = -1
            inputDir.y = 0
            break
        case "d":

            inputDir.x = +1
            inputDir.y = 0

            break
        case "ArrowRight":

            inputDir.x = +1
            inputDir.y = 0

            break
        default:
            break;
    }
})