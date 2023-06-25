const display = document.querySelector(".display");
const numButton = document.querySelectorAll(".numeric-button");
const opButton = document.querySelectorAll(".non-numeric-button");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const equals = document.querySelector(".equals");
let dotCount = 0;
let expression = "";

function isOperator(char) {
  return char === "+" || char === "-" || char === "*" || char === "/";
}

function getPrecedence(operator) {
  if (operator === "+" || operator === "-") {
    return 1;
  } else if (operator === "*" || operator === "/") {
    return 2;
  }
  return 0;
}

function operate(a, b, op) {
    if(op == '+')
    return a + b;
    if(op == '-')
    return a-b
    if(op == '*')
    return a*b;
    if(op == '/')
    return a/b;
}

function evalPostfix(postfix) {
    let stack = [];

    for(let i=0; i<postfix.length; i++) {
        const char = postfix[i];

        if(!isOperator(char))
        stack.push(Number(char));
        else {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(operate(a, b, char));
        }
    }
    return stack.pop();
}

function calc(expression) {
  let postfix = "";
  const stack = [];

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (!isOperator(char)) {
      postfix += char;
    } else {
      while (
        stack.length > 0 &&
        getPrecedence(stack[stack.length - 1]) >= getPrecedence(char)
      ) {
        postfix += stack.pop();
      }
      stack.push(char);
    }
  }

  while (stack.length > 0) {
    postfix += stack.pop();
  }

  return evalPostfix(postfix);
}

numButton.forEach((button) =>
  button.addEventListener("click", () => {
    display.innerHTML += button.innerHTML;
    expression += button.value;
  })
);

opButton.forEach((button) =>
  button.addEventListener("click", () => {
    if (button.innerHTML == ".") {
      dotCount += 1;
      if (dotCount == 1) {
        display.innerHTML += button.innerHTML;
        expression += button.value;
      }
    } else {
      display.innerHTML += button.innerHTML;
      expression += button.value;
      dotCount = 0;
    }
  })
);

clear.addEventListener("click", () => {
  display.innerHTML = "";
  expression = "";
  dotCount = 0;
});

del.addEventListener("click", () => {
  let len = display.innerHTML.length;
  display.innerHTML = display.innerHTML.slice(0, len - 1);
  expression = expression.slice(0, len - 1);
  console.log(expression);
});

equals.addEventListener("click", () => {
  display.innerHTML = calc(expression);
});
