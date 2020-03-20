console.log("Project One v2");

const ctx = document.querySelector('#game-canvas').getContext('2d')

let lives = 3
let score = 0
let level = 1
let timer = null
let gravity = 0.3
const canvas = {
	height: 600,
	width: 600,
}
let bricks = []
let collision = false
const playerSquare = {
	strokeColor: "black",
	height: 40,
	width: 40,
	xCord: 40,
	yCord: 560,
	speed: 5,
	velX: 0,
	velY:0,
	direction: null,
	jumping: false,
	grounded: false,
}
const winSquare = {

}
let collisionDirection = null
let friction = 0.8


// dimensions
// left wall
bricks.push({
    xCord: 0,
    yCord: 0,
    width: 10,
    height: canvas.height
});
//bottom
bricks.push({
    xCord: 0,
    yCord: canvas.height - 2,
    width: canvas.width,
    height: 50
});
// right wall
bricks.push({
    xCord: canvas.width - 10,
    yCord: 0,
    width: 50,
    height: canvas.height
});
//top test
bricks.push({
    xCord: 0,
    yCord: .000006,
    width: canvas.width,
    height: 50
});

// // actual level
// bricks.push({
//     xCord: 120,
//     yCord: 510,
//     width: 80,
//     height: 80
// });
// bricks.push({
//     xCord: 170,
//     yCord: 550,
//     width: 80,
//     height: 80
// });
// bricks.push({
//     xCord: 220,
//     yCord: 600,
//     width: 80,
//     height: 80
// });
// bricks.push({
//     xCord: 270,
//     yCord: 550,
//     width: 40,
//     height: 40
// });
if(level === 1) {
	bricks.push({
	    xCord: 300,
	    yCord: 450,
	    width: 200,
	    height: 40
	});
	bricks.push({
	    xCord: 100,
	    yCord: 250,
	    width: 200,
	    height: 40
	});
}

function animate() {
	clearCanvas()
	updateCanvas(playerSquare.direction)
	drawSquare()
	//printWinBrick()
	//drawBricks()
	//testBrick.draw()
	//testSpike.draw()
	window.requestAnimationFrame(animate)
}

function drawSquare() {
	ctx.fillStyle = 'rgb(255, 0, 0 , 0.5)'
	ctx.strokeStyle = playerSquare.strokeColor
	ctx.fillRect(playerSquare.xCord, playerSquare.yCord, playerSquare.height, playerSquare.width)
}

// function printWinBrick() {
// 	if(level === 1) {
// 		ctx.beginPath()
//  		ctx.fillStyle = 'rgb(255, 0, 0 , 0.5)'
//  		ctx.fillRect(bricks[i].xCord, bricks[i].yCord, bricks[i].width, bricks[i].height)
//  		checkCollision(playerSquare, bricks[i])
// 	}
// }
// function drawBricks() {
// 	for(let i = 0; i < bricks.length; i++) {
// 		ctx.beginPath()
// 		ctx.fillStyle = "black"
// 		ctx.fillRect(bricks[i].xCord, bricks[i].yCord, bricks[i].width, bricks[i].height)
// 		checkCollision(playerSquare, bricks[i])
// 	}
// }

function clearCanvas() {
	ctx.clearRect(0, 0, 600, 600)
}

function setDirection(keyCode) {
	if(keyCode === 37) {
		playerSquare.direction = 'left'
	} else if(keyCode === 39) {
		playerSquare.direction = 'right'
	} else if(keyCode === 38) {
		playerSquare.direction = 'up'
	} else {
		playerSquare.direction = null
	}
}

function updateCanvas(direction) {
	

	if (direction === "up") {
		if(playerSquare.jumping === false /*&& playerSquare.grounded === true*/) {
			// jump code
			playerSquare.jumping = true
			playerSquare.grounded = false
			playerSquare.velY = -playerSquare.speed * 2
			// setTimeout(() => {
			// 	playerSquare.velY = 10
			// }, 100)
		}
	} else if(direction === "left" && playerSquare.velX > -playerSquare.speed) {
		playerSquare.velX--
	} else if (direction === "right" && playerSquare.velX < playerSquare.speed) {
		playerSquare.velX++
	} 

	playerSquare.velX *= friction
	playerSquare.velY += gravity

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = "black"

	playerSquare.grounded = false
	for(let i = 0; i < bricks.length; i++) {
		ctx.fillRect(bricks[i].xCord, bricks[i].yCord, bricks[i].width, bricks[i].height)
		let dir = checkCollision(playerSquare, bricks[i])
	
		if(dir === "left" || dir === "right") {
			playerSquare.velX = 0
			playerSquare.jumping = false
		} else if (dir === "bottom") {
			playerSquare.grounded = true
			playerSquare.jumping = false
		} else if (dir === "top") {
			playerSquare.velY *= -1
		}
	}
	// vv THIS CODE IS BREAKING JUMP 
	// if(playerSquare.grounded === true) {
	// 	playerSquare.velY += 0
	// }

	playerSquare.xCord += playerSquare.velX
	playerSquare.yCord += playerSquare.velY

	if(playerSquare.grounded === true) {
		playerSquare.velY = 0
	}
	
}

function checkCollision(playerSquare, brick) {
			// finds center of the square
	let vX = (playerSquare.xCord + (playerSquare.width / 2)) - (brick.xCord + (brick.width / 2))

	let vY = (playerSquare.yCord +(playerSquare.height / 2)) - (brick.yCord + (brick.height / 2))
		// adding the widths and heights
	let hWidth = (playerSquare.width / 2) + (brick.width / 2)
	let hHeight = (playerSquare.height / 2) + (brick.height / 2)

	if(Math.abs(vX) < hWidth && Math.abs(vY) < hHeight) {
		let oX = hWidth - Math.abs(vX)
		let oY = hHeight - Math.abs(vY)
		if (oX >= oY) {
			if (vY > 0) {
				collisionDirection = "top"
				playerSquare.yCord += oY
			} else {
				collisionDirection = "bottom"
				playerSquare.yCord -= oY
			}
		} else {
			if (vX > 0) {
				collisionDirection = "left"
				playerSquare.xCord += oX
			} else {
				collisionDirection = "right"
				playerSquare.xCord -= oX
			}
		}
	}
	return collisionDirection
}

// puts everything on the canvas
animate()



// event listeners
document.body.addEventListener('keydown', (event) => {
	if(event.keyCode === 37) {
		setDirection(37)
	} else if (event.keyCode === 39) {
		setDirection(39)
	} else if (event.keyCode === 38) {
		setDirection(38)
	}
});

document.body.addEventListener("keyup", () => {
	setDirection(null)
	collisionDirection = null
})










