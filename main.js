
// Simple Calculator
// Get all the keys from document
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', '*', '/'];
var decimalAdded = false;

// Add onclick event to all the keys and perform operations
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		// Get the input and button values
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		
		// Now, just append the key values (btnValue) to the input string and finally use javascript's eval function to get the result
		// If clear key is pressed, erase everything
		if(btnVal == 'AC') {
			input.innerHTML = '';
			decimalAdded = false;
		}
		
		// If eval key is pressed, calculate and display the result
		else if(btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			// Replace all instances of x and ÷ with * and / respectively. This can be done easily using regex and the 'g' tag which will replace all instances of the matched character/substring
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			
			// Final thing left to do is checking the last character of the equation. If it's an operator or a decimal, remove it
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
			
			if(equation)
				input.innerHTML = eval(equation);
				
			decimalAdded = false;
		}
		
		// Basic functionality of the calculator is complete. But there are some problems like 
		// 1. No two operators should be added consecutively.
		// 2. The equation shouldn't start from an operator except minus
		// 3. not more than 1 decimal should be there in a number
		
		// We'll fix these issues using some simple checks
		
		// indexOf works only in IE9+
		else if(operators.indexOf(btnVal) > -1) {
			// Operator is clicked
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];
			
			// Only add operator if input is not empty and there is no operator at the last
			if(inputVal != '' && operators.indexOf(lastChar) == -1) 
				input.innerHTML += btnVal;
			
			// Allow minus if the string is empty
			else if(inputVal == '' && btnVal == '-') 
				input.innerHTML += btnVal;
			
			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				// Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
			decimalAdded =false;
		}
		
		// Now only the decimal problem is left. We can solve it easily using a flag 'decimalAdded' which we'll set once the decimal is added and prevent more decimals to be added once it's set. It will be reset when an operator, eval or clear key is pressed.
		else if(btnVal == '.') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		
		// if any other key is pressed, just append it
		else {
			input.innerHTML += btnVal;
		}
		
		// prevent page jumps
		e.preventDefault();
	} 
}


// Simple time left
var year = 2023;
var month = 1;
// 0 is january, 1 is fedruary
var day = 1;
var hour = 0;
var minute = 0;
var second = 0;
var eventtext = "until the next big thing"; // text that appears next to the time left
var endtext = "We reached the next big thing!!"; // text that appears when the target has been reached
var end = new Date(year,month,day,hour,minute,second);
function timeleft(){
	// now is = xxx number, start from 1900, so now must be addition of 1900
	var now = new Date();
	if(now.getYear() < 1900)
		yr = now.getYear() + 1900;

	// second, minute, hour, day, month must be get subtraction
	var sec = second - now.getSeconds();
	var min = minute - now.getMinutes();
	var hr = hour - now.getHours();
	var dy = day - now.getDate();
	var mnth = month - now.getMonth();
	var yr = year - yr;
	var daysinmnth = 32 - new Date(now.getYear(),now.getMonth(), 32).getDate();

	// each sec reduced 1000, then check reduced 1 1 minute
	if(sec < 0){
		sec = (sec+60)%60;
		min--;
	}

	// each minutes reduced 60, then check reduced 1 hour
	if(min < 0){
		min = (min+60)%60;
		hr--;	
	}

	// each hour reduced 24, then set day reduced 
	if(hr < 0){
		hr = (hr+24)%24;
		dy--;	
	}

	// day reduced 1
	if(dy < 0){
		dy = (dy+daysinmnth)%daysinmnth;
		mnth--;	
	}
	if(mnth < 0){
		mnth = (mnth+12)%12;
		yr--;
	}	
	var sectext = " seconds ";
	var mintext = " minutes, and ";
	var hrtext = " hours, ";
	var dytext = " days, ";
	var mnthtext = " months, ";
	var yrtext = " years, ";
	if (yr == 1)
		yrtext = " year, ";
	if (mnth == 1)
		mnthtext = " month, ";
	if (dy == 1)
		dytext = " day, ";
	if (hr == 1)
		hrtext = " hour, ";
	if (min == 1)
		mintext = " minute, and ";
	if (sec == 1)
		sectext = " second ";
	if(now >= end){
		document.getElementById("timeleft").innerHTML = endtext;
		clearTimeout(timerID);
	}
	else{
	document.getElementById("timeleft").innerHTML = yr + yrtext + mnth + mnthtext + dy + dytext + hr + hrtext + min + mintext + sec + sectext + eventtext;
	}
	timerID = setTimeout("timeleft()", 1000); 
}
window.onload = timeleft;

// Temperature converter
var inputTemperatures = document.querySelectorAll(".temperature-converter input");
var cencius = document.getElementById("cencius");
var fahrenheit = document.getElementById("fahrenheit");
var kelvin = document.getElementById("kelvin");

inputTemperatures.forEach(element => {
	element.oninput = function(){
		tempratureConverter(this);
	};
	element.onchange = function(){
		tempratureConverter(this);
	};
});

function tempratureConverter(self){
	let val = parseFloat(self.value);
	let id = self.id;
	
	// ℉=(℃*1.8)+32K
	// K=℃+273.15
	if(id == 'cencius'){
		fahrenheit.value = parseFloat((val*1.8)+32).toFixed(2);
		kelvin.value = parseFloat((val + 273.15)).toFixed(2);
	}

	// ℃=(℉-32)/1.8
	// K=((℉-32)/1.8)+273.15
	if(id == 'fahrenheit'){
		cencius.value = parseFloat((val-32)/1.8).toFixed(2);
		kelvin.value = parseFloat(((val-32)/1.8)+273.15).toFixed(2);
	}

	// ℉=((K-273.15)*1.8)+32
	// ℃=K-273.15
	if(id == 'kelvin'){
		fahrenheit.value = parseFloat(((val-273.15)*1.8)+32).toFixed(2);
		cencius.value = parseFloat((val-273.15)).toFixed(2);
	}
};