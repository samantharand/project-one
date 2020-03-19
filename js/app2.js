console.log("Project One v2");

const ctx = document.querySelector('#game-canvas').getContext('2d')

lives = 3
score = 0
level = 1
timer = null
gravity = 0.3
canvas = {
	height: 600,
	width: 600,
}
bricks = []
collision = false
playerSquare = {
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


// DRAW the SQAURE 

function animate() {
	moveSquare(playerSquare.direction)
	clearCanvas()
	drawSquare()
	//testBrick.draw()
	//testSpike.draw()
	window.requestAnimationFrame(animate)
}

function drawSquare() {
ctx.fillStyle = 'rgb(255, 0, 0 , 0.5)'
ctx.strokeStyle = playerSquare.strokeColor
ctx.fillRect(playerSquare.xCord, playerSquare.yCord, playerSquare.height, playerSquare.width)
}

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

function moveSquare(direction) {
	//playerSquare.grounded = true

	if(direction === "left" && playerSquare.velX > -playerSquare.speed) {
		playerSquare.velX--
	} else if (direction === "right" && playerSquare.velX < playerSquare.speed) {
		playerSquare.velX++
	} else if (direction === "up") {
		if(playerSquare.jumping === false ) {
			// jump code
			playerSquare.jumping = true
			playerSquare.grounded = false
			playerSquare.velY = -playerSquare.speed * 2
		}
	}
	playerSquare.velY += gravity

	playerSquare.xCord += playerSquare.velX
	playerSquare.yCord += playerSquare.velY
		
	if(playerSquare.xCord >= canvas.width - playerSquare.width) {
		playerSquare.xCord = canvas.width - playerSquare.width
	} else if (playerSquare.xCord <= 0) {
		playerSquare.xCord = 0
	}

	if(this.playerSquare.yCord >= this.canvas.height - this.playerSquare.height) {
		 	this.playerSquare.yCord = this.canvas.height - this.playerSquare.height
	 		this.playerSquare.jumping = false
	 	}

}




animate()






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
	playerSquare.velX = 0
})










