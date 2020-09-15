function add (a, b) {
   return `${a + b}`;
}

function substract (a, b) {
    return `${a - b}`;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate (a, b) {
    if (operator === 'add') {
        display(add(a, b));       //Displays the result 
        changeOnHold(add(a, b));    // Changes on hold [0] (our first number) to be equal to our operation, so it can be used later.
        operator = null;          //Changes back operator to null for the logic of the operators events listener
    } else if (operator === 'substract') {
        display(substract(a, b));
        changeOnHold(substract(a, b));
        operator = null;
    } else if (operator === 'multiply') {
        display(multiply(a, b));
        changeOnHold(multiply(a, b));
        operator = null;
        
    } else if (operator === 'divide') {
        display(divide(a, b));
        changeOnHold(substract(a, b));
        operator = null;
    }
}

function display (text) {
    adjustFontSize();
    const result = document.querySelector('#Result');
    const max = 'MAX'
    if (inScreen.length >= 15){
        result.textContent = max;
        result.style.textAlign = 'center';
    } else if (inScreen.length == 0) {
        result.textContent = text;
    } else {
        text = text.join('');
        result.textContent = text;
    }
}

function addNumberEvents () {
    const divs = document.querySelectorAll('.bNumber');
    const numbers = [];
    for(let i = 0; i < divs.length; i++) {
        addPointerStyle(divs[i]);
        numbers.push(divs[i].querySelector('.number'))
    }
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', function () {
            if (!operator) {
                onHold[0].push(numbers[i].textContent);
                inScreen.push(numbers[i].textContent);
                display(inScreen);
            } else {
                onHold[1].push(numbers[i].textContent);
                inScreen.push(numbers[i].textContent);
                display(inScreen);
            }
        });
    }
}


function addAcEvent () {
    const AC = document.querySelector('#bAC');
    addPointerStyle(AC);
    AC.addEventListener('click', function () {
        inScreen = [];
        onHold = [[], []];
        operator = null;
        const result = document.querySelector('#Result');
        result.style.fontSize = `50px`
        result.style.lineHeight = '120%'
        result.style.textAlign = 'end';
        display(inScreen);
    });
}

function addPointEvent () {
    const point = document.querySelector('#Point');
    addPointerStyle(point);
    let check = false;
    point.addEventListener('click', function () {
        check = inScreen.some((number) => number === '.');
        if (check === false) {
            inScreen.push('.'); //text.content method returns many spaces and some enter in between.
            display(inScreen);
        }
    });
}

function addSumEvent () {
    const sum = document.querySelector('#Plus');
    addPointerStyle(sum);
    sum.addEventListener('click', function () { 
        if (!operator) {
            eraseWhileOperate();
            operator = 'add';
        } else {
            getNumberFromHold();
            eraseWhileOperate();
            operate(a, b);
            operator = 'add';
        }
    });
}

function addSubsteactEvent () {
    const substract = document.querySelector('#Minus');
    addPointerStyle(substract);
    substract.addEventListener('click', function () {
        if (!operator) {
            eraseWhileOperate();
            operator = 'substract';
        } else {
            getNumberFromHold();
            eraseWhileOperate();
            operate(a, b);
            operator = 'substract';
        }
    });
}

function addMultiplyEvent () {
    const multiply = document.querySelector('#Times');
    addPointerStyle(multiply);
    multiply.addEventListener('click', function () {
        if (!operator) {
            eraseWhileOperate();
            operator = 'multiply';
        } else {
            getNumberFromHold();
            eraseWhileOperate();
            operate(a, b);
            operator = 'multiply';
        }
    })
}

function addDividerEvent () {
    const divider = document.querySelector('#Divider');
    addPointerStyle(divider);
    divider.addEventListener('click', function () {
        if (!operator) {
            eraseWhileOperate();
            operator = 'divide';
        } else {
            getNumberFromHold();
            eraseWhileOperate();
            operate(a, b);
            operator = 'divide';
        }
    })
}

function getNumberFromHold () {
    a = parseInt(onHold[0].join(''));
    b = parseInt(onHold[1].join(''));
}

function changeOnHold (number) {
    onHold[0] = [number];
    onHold[1] = [];
}



function eraseWhileOperate () {
    display(inScreen);
    inScreen = [];
}

function addPointerStyle (element) {
    element.style.cursor = 'pointer';
}

function addPointerStyleOperators () {
    const operator = document.querySelectorAll('.bOperator');
    for (let i = 0; i < operator.length; i++) {
        addPointerStyle(operator[i]);
    }
}

function changeColor () {

}

function adjustFontSize () {
    const result = document.querySelector('#Result');
    const fontSize = parseInt(window.getComputedStyle(result).getPropertyValue('font-size'));
    const newFontSize = fontSize / 2;
    if (inScreen.length == 8) {
        result.style.fontSize = `${newFontSize}px` 
        result.style.lineHeight = '250%'
    }
}

//Create variables that keep tracks of the numbers pressed.
let inScreen = [];
let onHold = [[], []];
let operator;
let a;
let b;


addNumberEvents();
addAcEvent();
addPointEvent();
addPointerStyleOperators();
addSumEvent();
addSubsteactEvent();
addMultiplyEvent();
addDividerEvent();