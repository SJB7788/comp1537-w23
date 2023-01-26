function calculate(num1, operator, num2) {
    if (operator == '+') {
        let answer = num1 + num2;
        return answer;
    } if (operator == '-') {
        let answer = num1 - num2;
        return answer;
    } if (operator == '/') {
        let answer = num1 / num2;
        return answer;
    } if (operator == '*') {
        let answer = num1 * num2;
        return answer;
    } else {
        let error_message = "Invalid Operator"
        return error_message 
    }
}

var num1 = parseFloat(prompt("Enter a number:"));
var operator = prompt("Enter an operator (+, -, *, /):");
var num2 = parseFloat(prompt("Enter another number:"));

var result = calculate(num1, operator, num2);
alert("Result: " + result);