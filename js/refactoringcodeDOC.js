function stats() {
	if(game.win === true) {
		game.score += 50
		game.level++
		//console.log(game.score);
		clearInterval(game.intervalID)
		animateAfterDeath()
	} else if(newPlayer.collision === true) {
		game.lives--
	} else if(game.timer === 0) {
		clearInterval(game.intervalID)
		//game.lives--
	}
	game.updateStats()	
}

function thingHappens() {
	if(game.win === true) {
		game.score += 50
		game.level++
		game.winGame()
		clearInterval(game.intervalID)
		game.updateStats()
		animateAfterDeath()
	} else if(newPlayer.collision === true) {
		game.lives--
		game.hit()
		game.updateStats()
	} else if(game.timer === 0) {
		game.lives--
		game.updateStats()
		clearInterval(game.intervalID)
	} else if(game.lives === 0) {
		game.hit()
		game.updateStats()
	}
}

