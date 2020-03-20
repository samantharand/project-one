console.log("Hello Project 1 v3");

const ctx = document.querySelector('#game-canvas').getContext('2d')


function animate() {
	clearCanvas()
	game.printLevelOne()
	newPlayer.draw()
	newPlayer.move()
	//updateCanvas(playerSquare.direction)
	//drawSquare()
	//printWinBrick()
	//drawBricks()
	//testBrick.draw()
	//testSpike.draw()
	window.requestAnimationFrame(animate)
}

function stopAnimate() {
	// idk tbh
}

// clears the whole canvas - used to prevent trailing
function clearCanvas() {
	ctx.clearRect(0, 0, 600, 600)
}


// CLASSES
class Player {
	constructor(xCord, yCord) {
		this.strokeColor = "black"
		this.height = 40
		this.width = 40
		this.xCord = xCord
		this.yCord = yCord
		this.speed = 5
		this.velX = 0
		this.velY = 0
		this.direction = {
			up: false,
			down: false,
			left: false,
			right: false,
		}
		this.jumping = false
		this.grounded = false
	}

	draw() {
		if(game.level === 1) {
			ctx.fillStyle = 'rgb(255, 0, 0 , 0.5)'
			ctx.strokeStyle = this.strokeColor
			ctx.fillRect(this.xCord, this.yCord, 40, 40)
		}
	}

	setDirection(keyCode) {
		console.log("setDirection");
		if(keyCode === 37) {
			this.direction.left = true
		} else if(keyCode === 39) {
			this.direction.right = true
		} else if(keyCode === 38) {
			this.direction.up = true
		} else {
			//this.direction = null
		}
	}

	unsetDirection(keyCode) {
	if(keyCode === 37) {
		newPlayer.direction.left = false
	} else if (keyCode === 39) {
		newPlayer.direction.right = false
	} else if (keyCode === 38) {
		newPlayer.direction.up = false
	}
	}

	move() {
		//console.log(this.direction);
		if(this.direction.left === true && this.velX > -this.speed) {
			this.velX--
		} else if (this.direction.right === true && this.velX < this.speed) {
			this.velX++
		} else if (this.direction.up === true) {
			if(this.jumping === false) {
				// jump code
				this.jumping = true
				this.velY = -this.speed * 2
			}
		}

		this.velY += game.gravity
		this.velX *= game.friction
		
		this.xCord += this.velX
		this.yCord += this.velY

		if(this.xCord + this.width >= game.canvas.width) {
			this.xCord = game.canvas.width - this.width
			this.velX = 0
		} else if (this.xCord <= 0) {
			this.xCord = 0
		}

		if(this.yCord >= game.canvas.height - this.height) {
			this.yCord = game.canvas.height - this.height
			this.jumping = false
		}

	}
}

class Brick {
	constructor(xCord, yCord, width, height){
		this.xCord = xCord
		this.yCord = yCord
		this.width = width
		this.height = height
	}

	draw() {
		if(game.level === 1) {
			clearCanvas()
			ctx.fillStyle = "black"
			ctx.fillRect(this.xCord, this.yCord, this.width, this.height)
		}
	}
}

// GAME OBJECT

const game = {
	lives: 3,
	score: 0,
	level: 1,
	timer: null,
	gravity: 0.3,
	friction: .9,
	canvas: {
		height: 600,
		width: 600,
	},
	bricks: [],
	collision: false,
	canvas: {
		height: 600,
		width: 600,
	},

	setUpLevel: function() {
		if(this.level === 1) {
			const brick1 = new Brick(300, 450, 200, 40)
			this.bricks.push(brick1)
		}
	},

	printLevelOne: function() {

		for(let i = 0; i < this.bricks.length; i++) {
			this.bricks[i].draw()

			let dir = this.collisionDetection(newPlayer, this.bricks[i])

			if(dir === "left" || dir === "right") {
				newPlayer.velX = 0
				newPlayer.jumping = false
			} else if (dir === "bottom") {
				newPlayer.grounded = true
				newPlayer.jumping = false
			} else if (dir === "top") {
				newPlayer.velY *= -1
			}
		}
	},

	collisionDetection(playerSquare, brick) {
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
		return this.collisionDirection
	}
}

const newPlayer = new Player(100, 450)
game.setUpLevel()
animate()


// event listeners
document.body.addEventListener('keydown', (event) => {
	if(event.keyCode === 37) {
		newPlayer.setDirection(37)
	} else if (event.keyCode === 39) {
		newPlayer.setDirection(39)
	} else if (event.keyCode === 38) {
		newPlayer.setDirection(38)
	}
});

document.body.addEventListener("keyup", (event) => {
	if(event.keyCode === 37) {
		newPlayer.unsetDirection(37)
	} else if (event.keyCode === 39) {
		newPlayer.unsetDirection(39)
	} else if (event.keyCode === 38) {
		newPlayer.unsetDirection(38)
	}
})
