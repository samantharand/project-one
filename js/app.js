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
	playerSquare: {
		strokeColor: "black",
		height: 40,
		width: 40,
		xCord: 100,
		yCord: 560,
	},
	drawLevel: function() {
		this.drawSquare()
	},

// puts player piece on the canvas
	drawSquare: function() {
		if(this.level === 1) {
			this.ctx.fillStyle = 'rgb(255, 0, 0 , 0.5)'
			this.ctx.strokeStyle = this.playerSquare.strokeColor
			this.ctx.fillRect(this.playerSquare.xCord, this.playerSquare.yCord, this.playerSquare.height, this.playerSquare.width)
			//this.ctx.strokeRect(100, 560, 40, 40)

		}
	},

	moveSquare: function(direction) {
		if(direction === "left") {		
			this.playerSquare.xCord -= 5;
		} else if (direction === "right") {
			this.playerSquare.xCord += 5;
		} else if (direction === "up") {
			this.playerSquare.yCord -= 5;
		}
		//this.ctx.clearRect(this.playerSquare.xCord, this.playerSquare.yCord, 40, 40)
		this.ctx.clearRect(0, 0, 600, 600)
		this.drawSquare()
	},
}


//event listners below
const body = document.querySelector('body')
body.addEventListener("DOMContentLoaded", () => {
	game.drawLevel()
})


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











