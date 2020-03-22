console.log("Hello Project 1 v3");

const ctx = document.querySelector('#game-canvas').getContext('2d')
const statBox = document.querySelector('#statsBox')
const stats = document.querySelector('.stats')
const level = document.querySelector('#level')
const timer = document.querySelector('#timer')
const lives = document.querySelector('#lives')
const score = document.querySelector('#score')
const win = document.querySelector('#win')
const lose = document.querySelector('#lose')
const reset = document.querySelector('.reset')
const nextLevel = document.querySelector('#nextLevel')
const quit = document.querySelector('#quit')

let requestID;

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
		if(game.lives > 0) {
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

////////

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

////////

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

/////////

class star {
	draw() {
		if(game.level === 1) {
			ctx.fillStyle = 'yellow'
			
		}	
	}
}

// GAME OBJECT
const game = {
	lives: 3,
	score: 0,
	level: 1,
	timer: 60,
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
	intervalID: null,

	startTimer() {
		this.intervalID = setInterval(() => {
			this.timer--
			this.updateStats()
		}, 1000)
	},

	playGame: function() {
		this.startTimer()
		this.setUpLevel()
		animate()
	},

	setUpLevel: function() {
		this.win = false
		if(this.level === 1) {
			const brick1 = new Brick(350, 200, 40, 200)
			const brick2 = new Brick(150, 230, 40, 200)
			this.bricks.push(brick1, brick2)
		} else if(this.level === 2) {
			const brick1 = new Brick(350, 400, 40, 200)
			const brick2 = new Brick(150, 230, 40, 200)
			this.bricks.push(brick1, brick2)
		}
	},

	printLevel: function() {

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
	},

	printWinSquare: function() {
		if(this.level === 1) {
	 		this.winSquare = new Winner(550, 260, 40, 40)
		}
	 	this.winSquare.draw()
		
	},

	passLevel() {
		console.log("passLevel");
		clearCanvas()
		ctx.font = '20px Georgia'
		ctx.fillStyle = "black"
		ctx.fillText("level passed :)", 250, 50)
	},

	lifeLost() {
		newPlayer = new Player(10, 150)
		if(this.lives === null) {
			console.log("lifeLost lives = 0 should print u lose");
			clearCanvas()
			ctx.font = '20px Georgia'
			ctx.fillStyle = "black"
			ctx.fillText("u lose :(", 275, 50)
		}
	},

	updateStats() {
		level.innerText = `${this.level}`
		timer.innerText = `${this.timer}`
		lives.innerText = `${this.lives}`
		score.innerText = `${this.score}`
	}

}

// EXTRA FUNCTIONS

function animate() {
	clearCanvas()
	game.printLevel()
	newPlayer.draw()
	newPlayer.move()
	requestID = window.requestAnimationFrame(animate)
	thingHappens()
	if(game.timer <= 10) {
		timer.style.color = "red"
	} else {
		timer.style.color = "black"
	}
	if(game.timer === 0 || game.win === true || game.lives === 0) {
		stopAnimate()
	}
}

function animateAfterDeath() {
	clearCanvas()
	newPlayer.draw()
	newPlayer.move()
	window.requestAnimationFrame(animateAfterDeath)
}

requestID;

function stopAnimate() {
	if(game.win === true){
		console.log("stopAnimate called inside stopAnimate");
		//animationRunning = false
		cancelAnimationFrame(requestID)
		animateAfterDeath()
	}
}

function thingHappens() {
	if(game.win === true) {
		console.log("win");
		game.score += 50
		clearInterval(game.intervalID)
		game.updateStats()
		win.style.display = 'flex'
		statBox.style.display = 'none'
		animateAfterDeath()
		game.passLevel()
	} else if(newPlayer.collision === true) {
		console.log("lifeLost");
		newPlayer.collision = false
		game.lives--
		game.lifeLost()
		game.updateStats()
	} else if(game.timer === 0) {
		if(game.lives > 0 || game.lives === null) {
			game.timer = 60
			game.startTimer()
		}
		game.lifeLost()
		console.log("timer");
		game.lives--
		game.updateStats()
		clearInterval(game.intervalID)
	} else if(game.lives === 0) {
		console.log('lives = 0');
		game.lives = null
		game.updateStats()
		game.lifeLost()
		animateAfterDeath()
		clearInterval(game.intervalID)
		lose.style.display = 'flex'
		statBox.style.display = 'none'
		game.lifeLost()
	}
}

// clears the whole canvas - used to prevent trailing
function clearCanvas() {
	ctx.clearRect(0, 75, 600, 300)
}

let newPlayer = new Player(10, 100)
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
	if(event.target.innerText === "reset") {
		ctx.clearRect(0, 0, 600, 300)
		animate()
		console.log("reset");
	} else if(event.target.innerText === "next level") {
		console.log("next level");
		game.level++
	}
})
