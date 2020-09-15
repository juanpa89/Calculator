function add (a, b) {
    return a + b;
}

function substract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate (operator, a, b) {
    return operator(a, b);
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
            if (onHold)
            inScreen.push(numbers[i].textContent);
            display(inScreen);
        });
    }
}

function getAnumber (number) {
    onHold[0] += number;
}

function getBnumber () {
    onHold[1] += number;
}

function addAcEvent () {
    const AC = document.querySelector('#bAC');
    addPointerStyle(AC);
    AC.addEventListener('click', function () {
        inScreen = [];
        onHold = 0;
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
    });
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

//Create variable that keep tracks of the numbers pressed.
let inScreen = [];
let onHold = [0, 0];
let operator;


addNumberEvents();
addAcEvent();
addPointEvent();
addPointerStyleOperators();