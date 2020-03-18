console.log("Hello Project One");

// class Square {
// 	constructor(color, x, y) {
// 		this.color = color
// 		this.x = x
// 		this.y = y
// 		this.height = 100
// 		this.width = 100
// 	}
// }

const game = {
	ctx: document.querySelector('#game-canvas').getContext('2d'),
	lives: 3,
	score: 0,
	level: 1,
	timer: null,
	gravity: 0.3,
	canvas: {
		height: 600,
		width: 600,
	},
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
	// smoother movement? -- why wont it work with "this"
	animate: function() {
		game.moveSquare(game.playerSquare.direction)
		game.clearCanvas()
		game.drawSquare()
		window.requestAnimationFrame(game.animate)
	},
	// starts the game
	drawLevel: function() {
		this.animate()
		//this.playerSquare.yCord += this.gravity
	},

// puts player piece on the canvas
	drawSquare: function() {
		if(this.level === 1) {
			this.ctx.fillStyle = 'rgb(255, 0, 0 , 0.5)'
			this.ctx.strokeStyle = this.playerSquare.strokeColor
			this.ctx.lineWidth = 2
			this.ctx.fillRect(this.playerSquare.xCord, this.playerSquare.yCord, this.playerSquare.height, this.playerSquare.width)
			//this.ctx.rect(this.playerSquare.xCord, this.playerSquare.yCord, this.playerSquare.height, this.playerSquare.width)
			//this.ctx.fill()
			//this.ctx.stroke()
			//this.ctx.strokeRect(100, 560, 40, 40)

		}
	},
	// clears the whole canvas - used to prevent trailing
	clearCanvas: function() {
		this.ctx.clearRect(0, 0, 600, 600)
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
		if(direction === "left" && this.playerSquare.xCord - this.playerSquare.width > -40) {
			this.playerSquare.xCord -= this.playerSquare.speed;
		} else if (direction === "right" && this.playerSquare.xCord + this.playerSquare.width < this.canvas.width) {
			this.playerSquare.xCord += this.playerSquare.speed;
		} else if (direction === "up" && this.playerSquare.yCord - this.playerSquare.height > -40) {
			if(this.playerSquare.jumping === false) {
				this.playerSquare.jumping = true
				this.playerSquare.yCord = -this.playerSquare.speed*2
			}
		}

		if(this.playerSquare.yCord >= this.canvas.height - this.playerSquare.height) {
			this.playerSquare.yCord = this.canvas.height - this.playerSquare.height
			this.playerSquare.jumping = false
		}
	},
}

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
})










