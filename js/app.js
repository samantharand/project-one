console.log("Hello Project One");

const ctx = document.querySelector('#game-canvas').getContext('2d')

class Brick {
	constructor(xCord, yCord) {
		this.xCord = xCord
		this.yCord = yCord
		this.height = 60
		this.width = 400
		this.collision = false
	}

	draw() {
		ctx.strokeStyle = 'black'
		ctx.lineWidth = 2
		ctx.strokeRect(this.xCord, this.yCord, this.width, this.height)

	}
}

const testBrick = new Brick(100, 475)

// class Obstacle {
// 	constructor(point) {
// 		this.point = point
// 		this.height = 60
// 		this.width = 400
// 		this.collision = false
// 	}

// 	draw() {
// 		ctx.beginPath()
// 		ctx.strokeStyle = 'black'
// 		ctx.lineWidth = 2
// 		ctx.moveTo(this.point, this.point)
// 		ctx.lineTo(this.point, this.point + 20)
// 		ctx.lineTo(this.point + 20, this.point)
// 		ctx.closePath()
// 		ctx.stroke()
// 	}
// }

// const testSpike = new Obstacle(550)

class Bonus {
	constructor () {

	}

	draw() {

	}
}

const game = {
	lives: 3,
	score: 0,
	level: 1,
	timer: null,
	gravity: 0.3,
	canvas: {
		height: 600,
		width: 600,
	},
	bricks: [],
	collision: false,
	playerSquare: {
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
	},
	collisionDirection: null,
	// smoother movement? -- why wont it work with "this"
	animate: function() {
		game.moveSquare(game.playerSquare.direction)
		game.clearCanvas()
		game.drawSquare()
		testBrick.draw()
		//testSpike.draw()
		window.requestAnimationFrame(game.animate)
	},
	// starts game on board
	drawLevel: function() {
		this.animate()
	},

// puts player piece on the canvas
	drawSquare: function() {
		if(this.level === 1) {
			ctx.fillStyle = 'rgb(255, 0, 0 , 0.5)'
			ctx.strokeStyle = this.playerSquare.strokeColor
			ctx.fillRect(this.playerSquare.xCord, this.playerSquare.yCord, this.playerSquare.height, this.playerSquare.width)
			//ctx.lineWidth = 2
			//ctx.rect(this.playerSquare.xCord, this.playerSquare.yCord, this.playerSquare.height, this.playerSquare.width)
			//ctx.fill()
			//ctx.stroke()
			//ctx.strokeRect(100, 560, 40, 40)

		}
	},
	// clears the whole canvas - used to prevent trailing
	clearCanvas: function() {
		ctx.clearRect(0, 0, 600, 600)
	},

	// set player square animation
	setDirection: function(keyCode) {
		if(keyCode === 37) {
			this.playerSquare.direction = 'left'
		} else if(keyCode === 39) {
			this.playerSquare.direction = 'right'
		} else if(keyCode === 38) {
			this.playerSquare.direction = 'up'
		} else {
			this.playerSquare.direction = null
		}
	},

	moveSquare: function(direction) {
		if(direction === "left" && this.playerSquare.velX > -this.playerSquare.speed) {
			this.playerSquare.velX--
		} else if (direction === "right" && this.playerSquare.velX < this.playerSquare.speed) {
			this.playerSquare.velX++
		} else if (direction === "up") {
			if(this.playerSquare.jumping === false) {
				// jump code
				this.playerSquare.jumping = true
				this.playerSquare.velY = -this.playerSquare.speed * 2
			}
		}
		this.playerSquare.velY += this.gravity
		
		this.playerSquare.xCord += this.playerSquare.velX
		this.playerSquare.yCord += this.playerSquare.velY
		
		if(this.playerSquare.xCord >= this.canvas.width - this.playerSquare.width) {
			this.playerSquare.xCord = this.canvas.width - this.playerSquare.width
		} else if (this.playerSquare.xCord <= 0) {
			this.playerSquare.xCord = 0
		}

		if(this.playerSquare.yCord >= this.canvas.height - this.playerSquare.height) {
			this.playerSquare.yCord = this.canvas.height - this.playerSquare.height
			this.playerSquare.jumping = false
		}

		this.checkCollision(this.playerSquare, testBrick)

		// if(this.collision === true) {
		// 	this.playerSquare.velX = 0
		// 	this.playerSquare.velY = 5
		// 		// top 
		// 	if(this.playerSquare.yCord < testBrick.yCord + testBrick.height) {
		// 		this.playerSquare.yCord = testBrick.yCord - 40
		// 	}
		// }
	},

	checkCollision: function(playerSquare, brick) {
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
			return collisionDirection
		}
	},	

	gameOver: function() {
		if(this.lives === 0) {
			alert("game over")
		}
	},
}

game.bricks.push(testBrick)
game.drawLevel()

//event listners below



const body = document.querySelector('body')

// move square
body.addEventListener('keydown', (event) => {
	if(event.keyCode === 37) {
		game.setDirection(37)
	} else if (event.keyCode === 39) {
		game.setDirection(39)
	} else if (event.keyCode === 38) {
		game.setDirection(38)
	}
});

body.addEventListener("keyup", () => {
	game.setDirection(null)
	game.playerSquare.velX = 0
})










