$(function() {
	var timer = null
	var sessionDuration = 25 * 60
	var timeLeft = sessionDuration
	var breakDuration = 5 * 60
	var start = true, inBreak = false

	//Start Button Click Logic
	$("#start").click(function(){
		if(start){
			timer = setInterval(displayTime, 1000)
			start = false
			$("#start").html("Stop")
			$("#time").css("opacity","1")
		}else{
			start = true
			$("#start").html("Start")
			$("#time").css("opacity","0.5")
			clearInterval(timer)
		}
	})

	//Reset Button Click Logic
	$("#reset").click(function(){
		console.log(timeLeft)
		clearInterval(timer)
		timeLeft = sessionDuration
		displayTime()
		start = true
		inBreak = false
		$("#time").css("opacity","1")
		$("#start").html("Start")
	})

	//Display Time Click Logic
	function displayTime(){
		var minutes, seconds;
		minutes = parseInt(timeLeft / 60, 10) //gets rid of decimals
		seconds = parseInt(timeLeft % 60, 10)
		minutes = (minutes < 10) ? "0" + minutes : minutes //adds 0
		seconds = (seconds < 10) ? "0" + seconds : seconds
		$("#time").html(minutes + ":" + seconds)
		if(--timeLeft < 0){
			if(inBreak){
				inBreak = false
				timeLeft = sessionDuration;
				$("#time").css("color","black")
			}else{
				inBreak = true
				timeLeft = breakDuration
				$("#time").css("color","red")
			}
		}
	}

	//Increase or decrease timer
	$("span").click(function(){
		var id = $(this).attr("id")
		if(sessionDuration > 0){
			if(id == 'ds' && sessionDuration > 60){
				sessionDuration -= 60
				$("#session-length").html((sessionDuration/60).toString())
				if(!inBreak){
					timeLeft = sessionDuration
					displayTime()
				}
			}
			if(id == 'is'){
				sessionDuration += 60 
				$("#session-length").html((sessionDuration/60).toString())
				if(!inBreak){
					timeLeft = sessionDuration
					displayTime()
				}
			}
		}
		if(breakDuration > 0){
			if(id == 'db' && breakDuration > 60){
					breakDuration -= 60
					$("#break-length").html((breakDuration/60).toString())
					if(inBreak){
						timeLeft = breakDuration
						displayTime()
					}
			}
			if(id == 'ib'){
					breakDuration += 60
					$("#break-length").html((breakDuration/60).toString())
					if(inBreak){
						timeLeft = breakDuration
						displayTime()
					}
			}
		}
	})
	$("#reset").click()
});	