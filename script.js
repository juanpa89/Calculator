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
    const result = document.querySelector('#Result');
    result.textContent = text;
}

function addNumberEvents () {
    const divs = document.querySelectorAll('.bNumber');
    const numbers = [];
    for(let i = 0; i < divs.length; i++) {
        numbers.push(divs[i].querySelector('.number'))
    }
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', function () {
            const text = numbers[i].textContent;
            display(text);
        })
    }

}

addNumberEvents();