console.log("Hello Project One");

class Square {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.height = 100
		this.width = 100
	}
}


const game = {
	$canvas: $('#game-board')[0]
	$ctx: $canvas.getContext('2d')
	lives: 3,
	score: 0,
	level: null,
	timer: null,

	drawSquare: function() {
		
	},
}


//event listners below