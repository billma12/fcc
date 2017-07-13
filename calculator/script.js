$(function(){
	var display = '';
	var entry = '';
	var history = '';
	var numbers = ['1','2','3','4','5','6','7','8','9','0'];
	var operators = ['/', '*', '+', '-'];
	var history_numbers = [];
	var history_operators = [];
	var ans = 0;


	$('button').click(function() {
		entry = $(this).attr('id');

		//number handling 
		if(numbers.includes(entry)){
			if(display === '0'){
				display = '';
				if(history[history.length-1] == '0'){
					history = history.slice(0,-1)
				}
			}
			
			if(display === ans & history_numbers.length === 0){
				display = '';
				history = '';
			}

			display += entry;
			history += entry;
			$('#result').html(display);
			$('#history').html(history);
		}

		//operator handling
		if((operators.includes(entry))){
			if (operators.includes(history[history.length-1])){
				history_operators.pop();
				history = history.slice(0,-1)
        	}
        	else{
	        	history_numbers.push(Number(display));
        	}
			history_operators.push(entry);
        	$('#result').html(entry)
        	display = '';

        	history += entry
        	$('#history').html(history)
        	
        	console.log(history_operators,history_numbers);
		}

		//when = sign is pressed
		if((entry === 'enter') & ((history_numbers.length + 1) > 1)){
			if(!operators.includes(history[history.length-1])){
				history_numbers.push(Number(display));
				console.log(history_numbers,history_operators)
				ans = history_numbers[0];
				for(i=1; i < history_numbers.length;i++){
					if(history_operators[i-1] === '+'){
						ans += history_numbers[i];
					}
					if(history_operators[i-1] === '-'){
						ans -= history_numbers[i];
					}
					if(history_operators[i-1] === '*'){
						ans *= history_numbers[i];
					}
					if(history_operators[i-1] === '/'){
						ans /= history_numbers[i];
					}
				}
				$('#result').html(ans);
				$('#history').html(history + '=' + ans)
				display = ans;
				history = ans;
				history_numbers = [];
				history_operators = [];
			}
		}

		//decimal
		if(entry === '.'){
			if(!display.includes('.')){
				display += entry
				history += entry;
				$('#result').html(display);
				$('#history').html(history);
			}
		}

		//worst shit i've ever written in my life

		//ce
		if(entry === 'ce'){
			if(!(operators.includes(history[history.length-2]) && (history[history.length-1] == '0'))){
				if(display === '0'){
					if(history_numbers.length > 0){
						history_operators.pop()
						history = history.slice(0,history.length-(history_numbers.pop().toString().length+1))
						display = '0'
						if(history == ''){
							$('#history').html("0")
						}else{
							$('#history').html(history)
						}
						$('#result').html(display)
					}
				}
				else if(display === ans){
					$('#result').html("0")
					$('#history').html("0")
				}
				else{
					history = history.slice(0,history.length-display.length)
					display = '0'
					if(history_numbers.length == 0){
						$('#history').html("0")
					}else{
						$('#history').html(history)
					}
					$('#result').html(display)
				}
			}
		}

		//reset
		if(entry === 'ac'){
			ans = 0;
			display = '0';
			history = '0';
			history_numbers = [];
			history_operators = [];
			$('#result').html('0');
			$('#history').html('0');
		}

	});//button handler
});//document_ready