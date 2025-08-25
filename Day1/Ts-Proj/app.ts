function calculate(operator: string): void {
  const num1Input = document.getElementById("num1") as HTMLInputElement;
  const num2Input = document.getElementById("num2") as HTMLInputElement;
  const resultElement = document.getElementById("result") as HTMLElement;

  const num1: number = parseFloat(num1Input.value);
  const num2: number = parseFloat(num2Input.value);

  if (isNaN(num1) || isNaN(num2)) {
    resultElement.innerText = "Result : Please enter valid numbers";
    return;
  }

  let result: number;

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

  resultElement.innerText = `Result : ${result}`;
}
