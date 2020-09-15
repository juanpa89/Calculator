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
        divs[i].style.cursor = 'pointer';
        numbers.push(divs[i].querySelector('.number'))
    }
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', function () {
            inScreen.push(numbers[i].textContent);
            display(inScreen);
        })
    }

}

function addAcEvent () {
    const AC = document.querySelector('#bAC');
    AC.style.cursor = 'pointer';
    AC.addEventListener('click', function () {
        inScreen = [];
        display(inScreen);
    })
}

function changeColor () {

}

function adjustFontSize () {
    const result = document.querySelector('#Result');
    const screen = document.querySelector('#Screen');
    const fontSize = parseInt(window.getComputedStyle(result).getPropertyValue('font-size'));
    const newFontSize = fontSize / 2;
    if (inScreen.length == 8) {
        result.style.fontSize = `${newFontSize}px` 
        result.style.lineHeight = '250%'
    }
}

//Create variable that keep tracks of the numbers pressed.
let inScreen = [];

addNumberEvents();
addAcEvent();