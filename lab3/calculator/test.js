function calculate(num1, operator, num2) {
    let answer = ''
    switch(operator) {
        case '+':
            answer = num1 + num2;
            return answer;
        case '-' :
            answer = num1 - num2;
            return answer
        case '/':
            answer = num1 / num2;
            return answer
        case '*':
            answer = num1 * num2;
            return answer
        default:
            error = "Invalid"
            return error     
    }
}

var num1 = parseFloat(prompt("Enter a number:"));
var operator = prompt("Enter an operator (+, -, *, /):");
var num2 = parseFloat(prompt("Enter another number:"));

var result = calculate(num1, operator, num2);
alert("Result: " + result);