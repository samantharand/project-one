console.log("Hello Project 1 v3");

const canvas = document.querySelector('#game-canvas')
const ctx = document.querySelector('#game-canvas').getContext('2d')
const statsBox = document.querySelector('#statsBox')
const stats = document.querySelector('.stats')
const level = document.querySelector('#level')
const timer = document.querySelector('#timer')
const lives = document.querySelector('#lives')
const score = document.querySelector('#score')
const win = document.querySelector('#win')
const lose = document.querySelector('#lose')
const reset = document.querySelector('.reset')
const credits = document.querySelector('.credits')
const quit = document.querySelector('#quit')
const winScore = document.querySelector('#winScore')
const menu = document.querySelector('#menu')
const start = document.querySelector('#start')
const creditsBox = document.querySelector('#creditsBox')
const mainMenu = document.querySelector(".mainMenu")

let requestID;
let deadRequestID;

// CLASSES
class Player {
	constructor(xCord, yCord) {
		this.height = 20
		this.width = 20
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
			ctx.fillRect(this.xCord, this.yCord, this.width, this.height)
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
			ctx.lineWidth = 2
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

class Star {
	draw() {
		if(game.level === 1) {
			ctx.fillStyle = 'gold'
			//ctx.fillRect(100, 100, 20, 20)
			ctx.beginPath()
			ctx.moveTo(330.0, 200)
			ctx.lineTo(335.0, 215.0)
			ctx.lineTo(350.0, 210.0)
			ctx.lineTo(337.5, 220.0)
			ctx.lineTo(350.0, 240.0)
			ctx.lineTo(330.0, 230.0)
			ctx.lineTo(300, 240.0)
			ctx.lineTo(317.5, 220.0)
			ctx.lineTo(300, 210.0)
			ctx.lineTo(320.0, 215.0)
			ctx.closePath()
			ctx.fill()
		}	
	}
}
// GAME OBJECT
const game = {
	lives: 3,
	score: 360,
	level: 1,
	timer: 60,
	gravity: 0.4,
	friction: .9,
	canvas: {
		height: 300,
		width: 600,
	},
	bricks: [],
	lose: false,
	win: false,
	winSquare: null,
	intervalID: null,
	bonus: false,

	startTimer() {
		console.log("start timer called");
		//clearInterval(game.intervalID)
		this.intervalID = setInterval(() => {
			this.timer--
			this.score -= 2
			this.updateStats()
		}, 1000)
	},

	playGame: function() {
		this.updateStats()
		clearInterval(game.intervalID)
		cancelAnimationFrame(deadRequestID)
		cancelAnimationFrame(requestID)
		this.startTimer()
		this.setUpLevel()
		animate()
	},

	setUpLevel: function() {
		this.win = false
		this.lose = false
		if(this.level === 1) {
			const brick1 = new Brick(-1, 200, 20, 20)
			const brick2 = new Brick(65, 230, 20, 200)
			const brick3 = new Brick(125, 115, 20, 170)
			const brick4 = new Brick(350, 200, 20, 200)
			const brick5 = new Brick(450, 200, 20, 200)
			const brick6 = new Brick(200, 205, 20, 100)
			const brick7 = new Brick(260, 265, 50, 20)
			this.bricks.push(brick1, brick2, brick3, brick4, brick5, brick6, brick7)
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
	 	this.winSquare = new Winner(550, 280, 20, 20)
	 	this.winSquare.draw()
		
	},

	passLevel() {
		console.log("passLevel");
		ctx.clearRect(0, 75, 600, 300)
		ctx.font = '20px Arial'
		ctx.fillStyle = "black"
		ctx.fillText(`YOU WIN!`, 255, 50)
		winScore.innerText = this.score
		//canvas.style.background.src = "css/fireworks.gif"
	},

	lifeLost() {
		newPlayer = new Player(10, 250)
		if(this.lives === null) {
			console.log("lifeLost lives = 0 should print u lose");
		}
	},

	updateStats() {
		//level.innerText = `${this.level}`
		timer.innerText = `${this.timer}`
		lives.innerText = `${this.lives}`
		score.innerText = `${this.score}`
	},

	reset() {
		cancelAnimationFrame(requestID)
		cancelAnimationFrame(deadRequestID)
		clearCanvas()
		this.score = 360
		this.lives = 3
		this.timer = 60
		this.bricks = []
		this.win = false
		this.lose = false
		newPlayer.collision = false
		newPlayer.vel = 0
		newPlayer.velY = 0
		newPlayer.speed = 5
		newPlayer.xCord = 10
		newPlayer.yCord = 250
		win.style.display = 'none'
		lose.style.display = 'none'
		statsBox.style.display = 'flex'
		clearInterval(game.intervalID)
		this.playGame()
	}

}

// EXTRA FUNCTIONS

function animate() {
	cancelAnimationFrame(deadRequestID)
	ctx.clearRect(0, 75, 600, 300)
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
	ctx.clearRect(0, 75, 600, 300)
	newPlayer.draw()
	newPlayer.move()
	deadRequestID = window.requestAnimationFrame(animateAfterDeath)
	console.log(deadRequestID, "animateAfterDeath");
}

requestID;
deadRequestID;

function stopAnimate() {
	if(game.win === true){
		console.log("stopAnimate called inside stopAnimate");
		//animationRunning = false
		cancelAnimationFrame(requestID)
		console.log("this is the request ID, \n", requestID)
		animateAfterDeath()
	}
}

function thingHappens() {
	if(game.win === true) {
		console.log("win");
		game.updateStats()
		clearInterval(game.intervalID)
		win.style.display = 'flex'
		statsBox.style.display = 'none'
		game.passLevel()
		animateAfterDeath()
	} else if(newPlayer.collision === true) {
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
		statsBox.style.display = 'none'
		game.lifeLost()
	}
}

// clears the whole canvas - used to prevent trailing
function clearCanvas() {
	ctx.clearRect(0, 0, 600, 300)
}

let newPlayer = new Player(10, 250)
let newStar = new Star()

// event listeners
document.body.addEventListener('keydown', (event) => {
	if(event.keyCode === 37) {
		newPlayer.setDirection(37)
	} else if (event.keyCode === 39) {
		newPlayer.setDirection(39)
	} else if (event.keyCode === 38) {
		newPlayer.setDirection(38)
	} else if(event.keyCode === 40) {
		console.log("down");
		newPlayer.height = 10
		newPlayer.yCord += 10
	} else if(event.keyCode === 32) {
		if(canvas.style.display === "block") {
			game.reset()
		}
	}
});

document.body.addEventListener("keyup", (event) => {
	if(event.keyCode === 37) {
		newPlayer.unsetDirection(37)
	} else if (event.keyCode === 39) {
		newPlayer.unsetDirection(39)
	} else if (event.keyCode === 38) {
		newPlayer.unsetDirection(38)
	} else if(event.keyCode === 40) {
		newPlayer.height = 20
	}
})

document.body.addEventListener("click", (event) => {
	//console.log(event);
	if(event.target.innerText === "reset") {
		game.reset()
	} else if(event.target.innerText === "credits") {
		statsBox.style.display = "none";
		lose.style.display = "none";
		win.style.display = "none";
		menu.style.display = "none";
		canvas.style.display = "none";
		creditsBox.style.display = "flex";
	} else if(event.target.innerText === "start") {
		menu.style.display = "none";
		statsBox.style.display = "block"
		canvas.style.display = "block"
		game.reset()
		game.playGame()
	} else if(event.target.innerText === "menu") {
		console.log('menu');
		game.reset()
		statsBox.style.display = "none";
		lose.style.display = "none";
		win.style.display = "none";
		lose.style.display = "none";
		win.style.display = "none";
		creditsBox.style.display = "none";
		canvas.style.display = "none"
		menu.style.display = "flex";
		game.playGame()
	}
})
