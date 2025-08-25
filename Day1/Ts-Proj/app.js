function calculate(operator) {
    var num1Input = document.getElementById("num1");
    var num2Input = document.getElementById("num2");
    var resultElement = document.getElementById("result");
    var num1 = parseFloat(num1Input.value);
    var num2 = parseFloat(num2Input.value);
    if (isNaN(num1) || isNaN(num2)) {
        resultElement.innerText = "Result : Please enter valid numbers";
        return;
    }
    var result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                resultElement.innerText = "Result : Cannot divide by zero";
                return;
            }
            result = num1 / num2;
            break;
        default:
            resultElement.innerText = "Result : Invalid operator";
            return;
    }
    resultElement.innerText = "Result : ".concat(result);
}
