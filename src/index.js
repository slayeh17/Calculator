const display = document.querySelector(".display")
const numButton = document.querySelectorAll(".numeric-button")
const opButton = document.querySelectorAll(".non-numeric-button")
const clear = document.querySelector(".clear")
const del = document.querySelector(".delete")
const equals = document.querySelector(".equals")
let dotCount = 0;
let expression = ""

function isOperator(op) {
    return (op == '+' ||op == '-' ||op == '/' ||op == '*')
}

function precedence(op) {
    if(op == '+' || op == '-')
    return 1;
    if(op == '/' || op == '*')
    return 2;
}

function checkPrecedence(currentOp,stackOp) {
    if(precedence(currentOp) > precedence(stackOp))
    return true;
    else
    return false;
}

function calc(str) {
    let stack = []
    let top = -1;
    let postfix = "";
    for(let i=0; i<str.length; i++) {
        if(top == -1 && isOperator(str[i]))
        stack.push(str[i]);
        else if(top!=-1 && isOperator(str[i])) {
            if(checkPrecedence(str[i], stack[top]))
            stack.push(str[i]);
            else {
                while(checkPrecedence(str[i], stack[top])==false)
                postfix += stack.pop();

                stack.push(str[i]);
            }
        }
        else
        postfix += str[i];
    }
}


numButton.forEach((button) => 
    button.addEventListener('click', () => {
        display.innerHTML += button.innerHTML;
        expression += button.value;
    }));

opButton.forEach((button) => 
button.addEventListener('click', () => {
    if(button.innerHTML == '.') {
        dotCount+=1;
        if(dotCount==1) {
            display.innerHTML += button.innerHTML;
            expression += button.value;
        }
    }
    else {
        display.innerHTML += button.innerHTML;
        expression += button.value;
        dotCount = 0;
    }
}));

clear.addEventListener('click', () => {
    display.innerHTML = "";
    expression = "";
    dotCount = 0;
});

del.addEventListener('click', () => {
    let len = display.innerHTML.length;
    display.innerHTML = display.innerHTML.slice(0,len-1);
    expression = expression.slice(0, len-1);
})

equals.addEventListener('click', () => {
    display.innerHTML = calc(expression);
})