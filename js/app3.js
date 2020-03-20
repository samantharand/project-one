console.log("Hello Project 1 v3");

const ctx = document.querySelector('#game-canvas').getContext('2d')

function animate() {
	clearCanvas()
	newPlayer.draw()
	//updateCanvas(playerSquare.direction)
	//drawSquare()
	//printWinBrick()
	//drawBricks()
	//testBrick.draw()
	//testSpike.draw()
	window.requestAnimationFrame(animate)
}

function stopAnimate() {

}

// clears the whole canvas - used to prevent trailing
function clearCanvas() {
	ctx.clearRect(0, 0, 600, 600)
}

class Player {
	constructor(xCord, yCord) {
		this.strokeColor = "black"
		this.height = 40
		this.width = 0
		this.xCord = xCord
		this.yCord = yCord
		this.speed = 5
		this.velX = 0
		this.velY = 0
		this.direction = null
		this.jumping = false
		this.grounded = false
	}

	draw() {
		// if(game.level === 1) {
			ctx.fillStyle = 'rgb(255, 0, 0 , 0.5)'
			ctx.strokeStyle = this.strokeColor
			ctx.fillRect(this.xCord, this.yCord, 40, 40)
			//ctx.lineWidth = 2
			//ctx.rect(this.xCord, this.yCord, this.height, this.width)
			//ctx.fill()
			//ctx.stroke()
			//ctx.strokeRect(100, 560, 40, 40)

		//}
	}
}

const game = {
	level: 1,
}

const newPlayer = new Player(100, 560)

animate()



