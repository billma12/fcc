var game = {

	order: [],
	round: 1,
	count: 0,
	colors: ['red','blue','green','yellow'],
	inGame: false,
	strict: false,

	newGame: function(){
		this.inGame = true
		this.order = []
		this.round = 1
		this.count = 0
		this.nextRound()
	},

	nextRound: function(){
		$("#round").html("Round: " + game.round)
		this.generateMove()
		console.log(this.order)
		this.display(this.order)
	},

	generateMove: function(){
		this.order.push(this.colors[Math.floor(Math.random()*this.colors.length)])
	},

	display: function(sequence){
		var i = 0
		game.inGame = false
		game.disableBoard()

		var interval = setInterval(function(){
			console.log("showing " + sequence[i])
			game.show(sequence[i])
			i++
			if(i >= sequence.length){
				game.inGame = true
				$("#msg").html("Moves: " + game.count)
				game.enableBoard()
				clearInterval(interval)
			}
		}, 850)
	},

	show: function(color){
		$('#' + color).mousedown()
		setTimeout(function(){up($("#" + color))}, 300)
	},

	strict_toggle: function(){
		game.strict = (game.strict==true) ? false : true
		var status = (game.strict===true) ? "On" : "Off"
		$("#strict-status").html("Strict Mode: " + status)
	},

	clicker: function(e){
		if(game.inGame){
			if(e.target.id != game.order[game.count]){
				if(game.strict){
					game.inGame = false
					console.log("you lose!")
					$("#msg").html("Game Over!")				
				}
				else{
					game.count = 0
					$("#msg").html("Wrong, displaying again.")
					game.display(game.order)
				}
			}
			else{
				console.log("correct")
				game.count++
				$("#msg").html("Moves: " + game.count)
				if(game.count === game.round){
					if(game.count === 20){
						game.inGame = false
						$("#msg").html("Congrats, you win. Play Again?")
					}
					else{
						game.round++;
						game.count = 0;
						game.nextRound();
					}
				}
			}
		}
	},

	enableBoard: function(){
		$(".board").css({"cursor": "pointer",
						 "pointer-events": "auto"})
		$("#newGame").prop("disabled", false)
		$("#strict").prop("disabled", false)
	},

	disableBoard: function(){
		$(".board").css({"cursor": "not-allowed",
					 	"pointer-events": "none"})
		$("#newGame").prop("disabled", true)
		$("#strict").prop("disabled", true)
	}
}


$(document).ready(function(){
	//event listeners
	$(".board").click(game.clicker)
	$("#strict").click(game.strict_toggle)
});

function play(){
	var audio = document.getElementById("audio1");
	audio.play();
}

function down(e){
	var audio = document.getElementById("audio"+e.id);
	audio.play();
	$(e).css("opacity","0.5")
}

function up(e){
	$(e).css("opacity", "1")
}