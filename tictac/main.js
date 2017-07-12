var turn = 'x';
var possible = [1,2,3,4,5,6,7,8,9];
var total = 0;
var end = false;
var start = true;

function nextMove(square){
	if (start){
		document.getElementById("msg").innerText = 'Please select x or o';
	}
	else{
		if(square.innerText == '' && end == false){
			your_turn(square);
			checkWin(turn);
			switch_move();
			computer_turn();
			checkWin(turn);
			switch_move();
			checkDraw();
		}
	}
}

function set_x(){
	start = false;
	document.getElementById("x").style.display = 'none';
	document.getElementById("o").style.display = 'none';
	document.getElementById("msg").innerText = 'Your turn!';
}

function set_o(){
	start = false;
	document.getElementById("x").style.display = 'none';
	document.getElementById("o").style.display = 'none';
	computer_turn();
	switch_move();
	document.getElementById("msg").innerText = 'Your turn!';
}

function newGame(){
	turn = 'x';
	possible = [1,2,3,4,5,6,7,8,9];
	total = 0;
	end = false;
	start = true;
	for(var i = 1; i < 10; i++){
		document.getElementById(i.toString()).innerText = '';
	}
	document.getElementById("msg").innerText = '';
	document.getElementById("x").style.display = '';
	document.getElementById("o").style.display = '';
}

function checkDraw(){
	if(!end){
	console.log("checking for draw" + ", total is " + total);
		if (total==45){
			end = true;
			document.getElementById("msg").innerText = 'draw!';
		}
	}
}
function switch_move(){
	console.log("switch move");
	turn = (turn == 'x') ? 'o' : 'x';
}

function delete_from_possible(id) {
	possible.splice(possible.indexOf(parseInt(id)),1);
}

function your_turn(square){
	console.log("your move");
	square.innerText = turn;
	total += parseInt(square.id);
	delete_from_possible(square.id);
	document.getElementById("msg").innerText = 'Your turn!';
}

function computer_turn(){
	if(!end){
		console.log("computer's move");
		var random_index = Math.floor((Math.random() * possible.length));
		if(possible.length > 0){
			document.getElementById(possible[random_index].toString()).innerText = turn;
			total += parseInt(possible[random_index]);
			delete_from_possible(possible[random_index]);
		}
	}
}

function checkWin(turn){
	var solutions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[7,5,3]];
	var a,b,c;

	console.log("checking if " + turn + " wins");
	if(!end){
		for(var i=0; i < solutions.length; i++){
			a = solutions[i][0];
			b = solutions[i][1];
			c = solutions[i][2];

			if((document.getElementById(a.toString()).innerText == turn) &&
		   	(document.getElementById(b.toString()).innerText == turn) &&
		   	(document.getElementById(c.toString()).innerText == turn)){
				document.getElementById("msg").innerText = turn + " wins!";
				end = true;
			}
		}
	}
}