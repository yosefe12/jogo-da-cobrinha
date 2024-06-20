const canvas = document . querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")
const h1 = document.querySelector("h1")
const audio = new Audio("../assets/audio.mp3")
const size = 30
const snake = [
    {x: 270, y: 270},
    {x: 300, y: 270},
    {x: 330, y: 270},
    {x: 360, y: 270},
    {x: 390, y: 270},
    {x: 420, y: 270}
  
]
const incrementScore = () => {
    score.inneerText =  parseInt + score.inneerText + 10
}
    const randonNumber = (min, max) => {
        return Math.round(Math.random() * (max - min) + min)
    }

    const randonPosstion = () => {
       const number = randonNumber(0, canvas.width - size)
       return Math.round(number / 30) * 30
    } 
    const randonColor = () =>{
     const red = randonNumber(0, 255)
     const green = randonNumber(0, 255)
     const blue = randonNumber(0, 255) 

     return `rgb(${red}, ${green}, ${blue})`
    }

   

const food = {
    x: randonPosstion(),
    y: randonPosstion(),
    color: randonColor()
}


let direction, loopId

const drawFood = () => {

const { x, y, color } = food
ctx.shadowColor = color   
    ctx.fillStyle = food.color
    ctx.fillRect(food.x, food.y, size, size)
}



        function drawSnake() {


            ctx.fillStyle = "#ddd"

            snake.forEach((position, index) => {
                if (index == snake.length - 1) {
                    ctx.fillStyle = "blue"
                }
                ctx.fillRect(position.x, position.y, size, size)
            })



        }

    const moveSnake = () => {
    
    
        if (!direction) return
        const head = snake[snake.length - 1]

       

        if (direction == "right"){
            snake.push({x: head.x + size, y: head.y})
        }
         
        if (direction == "left"){
            snake.push({x: head.x - size, y: head.y})
        } 

        if (direction == "down"){
            snake.push({x: head.x, y: head.y + size})
        }

        if (direction == "up"){
            snake.push({x: head.x, y: head.y - size})
        }
        snake.shift()
    }

    const drawGrid = () => {

        ctx.lineWidth = 1
        ctx.strokeStyle = "white"
        for (let i = 30; i < canvas.width; i += 30) {
            ctx.beginPath()
            ctx.lineTo(i, 0)
            ctx.lineTo(i, 600)
            ctx.stroke()

            ctx.beginPath()
            ctx.lineTo(0, i)
            ctx.lineTo(600, i)
            ctx.stroke()
        }
        

    }

    const chackEat = () => {
const head =  snake[snake.length - 1]
incrementScore()
if (head.x == food.x && head.y == food.y) {
    snake.push(head)
audio.play()
let x = randonPosstion()
let y = randonPosstion()

while (snake.find((posstion) =>  posstion.x == x && posstion.y == y)){
    x = randonPosstion()
    y = randonPosstion()
} 


food.x = x
food.y = y
food.color = randonColor()
}
    }

    const checkCollision = () =>{
         const head = snake[snake.length - 1]
const canvasLimit = canvas.width - size 
const neckIndex = snake.length - 2
const wallColision = 
head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit 

const selfCollison = snake.find((position, index) => {
return index < neckIndex && position.x == head.x && position.y == head.y
})
if (wallColision || selfCollison) {
           gameOver()
        }
    }

    const gameOver = () => {
        direction = undefined

        menu.style.display = "flex"
        finalScore.inneerText - score
        canvas.style.filter = "blur(2px)"
    } 
 
    const gameLoop = () => {
        clearInterval(loopId)
        ctx.clearRect(0, 0, 600, 600)
        drawGrid()
        drawFood()  
        moveSnake()
        drawSnake()
        chackEat()
        checkCollision()

         loopId = setTimeout(() =>{
            gameLoop()
        }, 300)

    }

     gameLoop()

    document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }
     if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
    })