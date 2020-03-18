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
	canvas: {
		height: 600,
		width: 600,
	},
	playerSquare: {
		strokeColor: "black",
		height: 40,
		width: 40,
		xCord: 100,
		yCord: 560,
		direction: null,
	},
	// smoother movement? -- why wont it work with "this"
	animate: function() {
		game.moveSquare()
		game.clearCanvas()
		game.drawSquare()
		window.requestAnimationFrame(game.animate)
	},
	// starts the game
	drawLevel: function() {
		this.animate()
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
	setDirection: function() {
	
	},

	moveSquare: function(direction) {
		if(direction === "left" && this.playerSquare.xCord - this.playerSquare.width > -40) {
			this.playerSquare.xCord -= 5;
		} else if (direction === "right" && this.playerSquare.xCord + this.playerSquare.width < this.canvas.width) {
			this.playerSquare.xCord += 5;
		} else if (direction === "up" && this.playerSquare.yCord - this.playerSquare.height > -40) {
			this.playerSquare.yCord -= 5;
		}
		//this.ctx.clearRect(this.playerSquare.xCord, this.playerSquare.yCord, 40, 40)
		//this.clearCanvas()
		//this.drawSquare()
	},
}
game.drawLevel()

//event listners below



const body = document.querySelector('body')

// move square
body.addEventListener('keydown', (event) => {
	if(event.keyCode === 37) {
		game.moveSquare("left")
	} else if (event.keyCode === 39) {
		game.moveSquare("right")
	} else if (event.keyCode === 38) {
		game.moveSquare("up")
	}
});











