console.log("Hello Project 1 v3");

const ctx = document.querySelector('#game-canvas').getContext('2d')
const level = document.querySelector('#level')
const timer = document.querySelector('#timer')
const lives = document.querySelector('#lives')
const score = document.querySelector('#score')

let requestID;

function animate() {
	
	clearCanvas()
	game.printLevelOne()
	newPlayer.draw()
	newPlayer.move()
	requestID = window.requestAnimationFrame(animate)
	stopAnimate()
}

function animateAfterDeath() {
	clearCanvas()
	newPlayer.draw()
	newPlayer.move()
	window.requestAnimationFrame(animateAfterDeath)
}

requestID

function stopAnimate() {
	if(game.win === true || newPlayer.collision === true){
		console.log("stopAnimate called");
		//animationRunning = false
		cancelAnimationFrame(requestID)
		animateAfterDeath()
	}
}

// clears the whole canvas - used to prevent trailing
function clearCanvas() {
	ctx.clearRect(0, 0, 600, 300)
}

// CLASSES
class Player {
	constructor(xCord, yCord) {
		this.strokeColor = "black"
		this.height = 40
		this.width = 40
		this.xCord = xCord
		this.yCord = yCord
		this.rightEdge = this.xCord + this.width
		this.bottomEdge = this.yCord - this.height
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
		this.collision = false
	}

	draw() {
		if(game.level === 1) {
			ctx.fillStyle = 'rgb(255, 0, 0 , 0.5)'
			ctx.strokeStyle = this.strokeColor
			ctx.fillRect(this.xCord, this.yCord, 40, 40)
		}
	}

	stayOnScreen() {
		if(this.collision === false) {
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

	setDirection(keyCode) {
		console.log("setDirection");
		if(keyCode === 37) {
			this.direction.left = true
		} else if(keyCode === 39) {
			this.direction.right = true
		} else if(keyCode === 38) {
			this.direction.up = true
		} else {
			this.direction = null
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

		this.stayOnScreen()
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
			ctx.strokeStyle = "black"
			ctx.lineWidth = 3
			ctx.strokeRect(this.xCord, this.yCord, this.width, this.height)
		}
	}
}

class Winner {
	constructor(xCord, yCord, width, height){
		this.xCord = xCord
		this.yCord = yCord
		this.width = width
		this.height = height
	}

	draw() {
		if(game.level === 1) {
			ctx.fillStyle = 'rgb(255, 0, 0 , 0.5)'
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
		height: 300,
		width: 600,
	},
	bricks: [],
	collisionDirection : null,
	lose: false,
	win: false,
	winSquare: null,

	playGame: function() {
		game.setUpLevel()
		animate()
		if(this.win === true) {
			this.score += 50
			this.level++
			console.log("hi");
		}
	},

	setUpLevel: function() {
		this.win = false
		if(this.level === 1) {
			const brick1 = new Brick(350, 200, 40, 200)
			const brick2 = new Brick(150, 230, 40, 200)
			this.bricks.push(brick1, brick2)
		}
	},

	printLevelOne: function() {

		for(let i = 0; i < this.bricks.length; i++) {
			this.bricks[i].draw()

			this.collisionDetection(newPlayer, this.bricks[i])
		}
		this.printWinSquare()
		this.collisionDetection(newPlayer, this.winSquare)
	},

	collisionDetection(playerSquare, brick) {
		  // right edge
		if(playerSquare.xCord + playerSquare.width > brick.xCord &&
	      // my left edge is to the left of the right edge of the thing
	      playerSquare.xCord < brick.xCord + brick.width &&
	      // the brick's top edge is above the my bottom edge (my y + my height)
	      brick.yCord < playerSquare.yCord + playerSquare.height && 
	      // the brick's bottom edge is below my top edge
	      brick.yCord + brick.height > playerSquare.yCord) {  
		   
		    //console.log("collision")
			if(this.win === false) {			
				if(brick === this.winSquare) {
					setTimeout(() => {	
						this.win = true
					}, 500)
				} else {
			  		newPlayer.collision = true
				}
			}
	    }
	   

		// return this.collisionDirection
		if(this.win === true) {
			this.winGame()
		} else if(newPlayer.collision === true) {
			this.gameOver()
		}

	},

	printWinSquare: function() {
		if(this.level === 1) {
	 		this.winSquare = new Winner(550, 260, 40, 40)
		}
	 	this.winSquare.draw()
		
	},

	winGame() {
		//this.score += 50
		//console.log("win");
		//stopAnimate()
		clearCanvas()
		ctx.font = '20px Georgia'
		ctx.fillStyle = "black"
		ctx.fillText("you win :)", 10, 50)
	},

	gameOver() {
		//console.log("game over");
		//this.lives--
		if(lives === 0) {
			//stopAnimate()
			clearCanvas()
			ctx.font = '20px Georgia'
			ctx.fillStyle = "black"
			ctx.fillText("u lose :(", 10, 50)
		}
	}

}

const newPlayer = new Player(10, 150)
game.playGame()

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

document.body.addEventListener("click", (event) => {
	console.log(event);
})
