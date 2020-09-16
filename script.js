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
    if (a == 0 && b == 0) {
        return 'Error'
    }
    return a / b;
}

function operate (a, b) {
    if (operator === 'add') {
        display(add(a, b));         //Displays the result 
        changeOnHold(add(a, b));    // Changes on hold [0] (our first number) to be equal to our operation, so it can be used later.
        operator = '';           //Changes back operator to null for the logic of the operators events listener
    } else if (operator === 'substract') {
        display(substract(a, b));
        changeOnHold(substract(a, b));
        operator = '';
    } else if (operator === 'multiply') {
        display(multiply(a, b));
        changeOnHold(multiply(a, b));
        operator = '';
        
    } else if (operator === 'divide') {
        display(divide(a, b));
        changeOnHold(substract(a, b));
        operator = '';
    }
}

function display (text) {
    adjustFontSize();
    const result = document.querySelector('#Result');
    if (inScreen.length >= 15){
        result.textContent = 'MAX';
        result.style.textAlign = 'center';
    } else if (inScreen.length === 0) { 
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
            if (operator === '') {
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
        inScreen = [];                          //Resets these 3 variables to our starting point when the page reloads.
        onHold[0] = [];
        onHold[1] = [];
        onHold[1][0] = 0;
        operator = '';
        const result = document.querySelector('#Result');   //Resets all style variables as they were when the page reloads.
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
    point.addEventListener('click', function () {  //Adds only one point. Checks if . is already in the arrays.
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
        operateLogic('add');
        
    });
}

function addSubsteactEvent () {
    const substract = document.querySelector('#Minus');
    addPointerStyle(substract);
    substract.addEventListener('click', function () {
        operateLogic('substract');
    });
}

function addMultiplyEvent () {
    const multiply = document.querySelector('#Times');
    addPointerStyle(multiply);
    multiply.addEventListener('click', function () {
        operateLogic('multiply');
    })
}

function addDividerEvent () {
    const divider = document.querySelector('#Divider');
    addPointerStyle(divider);
    divider.addEventListener('click', function () {
        operateLogic('divide');
    });
}

function addPlusMinusEvent () {
    const plusMinus = document.querySelector('#PlusMinus');
    addPointerStyle(plusMinus);
    plusMinus.addEventListener('click', function () {
        const totalHoldIndexOne = onHold[1].reduce((total, currentValue) => total + currentValue);
        if (totalHoldIndexOne == 0) {        //In order to change the number to minus or plus. It gives -1 and makes a multiply operation.         
            operator = 'multiply';
            onHold[1][0] = -1;    
            getNumberFromHold();            //MAkes a and b equal to the hold.
            eraseWhileOperate();            //Erases the screen. If not called, it will trow an ERROR on the display function for  not being
            operate(a, b);                  //able to join 2 numbers.
        } else {
            //operate first,
            operateLogic('');
            //change
            operator = 'multiply';
            onHold[1][0] = -1;
            getNumberFromHold();
            eraseWhileOperate();
            operate(a, b);
            
        }
    })
}

function addEqualEvent () {
    const equal = document.querySelector('#Equal');
    addPointerStyle(equal);
    equal.addEventListener('click', function () {
        const totalHoldIndexOne = onHold[1].reduce((total, currentValue) => total + currentValue); 
        const rememberOperator = operator;
        if (totalHoldIndexOne == 0) {                    //Makes nothing if the total of hold[1] is 0, which means that nothing has been pressed so far, 
            return;                                      //or an operation has just been done, to mantain the display if pressed twice in a row.
        } else {
            operateLogic('');
        }
    })
}

function addPercentEvent () {                               //It has to give back the number / 100.
    const percent = document.querySelector('#Percent');
    addPointerStyle(percent);
    percent.addEventListener('click', function () {
        const totalHoldIndexOne = onHold[1].reduce((total, currentValue) => total + currentValue); 

        if (totalHoldIndexOne == 0) {
            onHold[1][0] = 100;
            operator = 'divide';
            operateLogic('');
        }
        //Only works with onHold[0].
        // If inHold[0] and [1] have valid number. It first operates and then divides by 100.
    })
}

function operateLogic (nextOperator) {
    if (onHold[0].length == 0) {            //This logic prevents the display to show NaN if 2 operator are pressed before any number.
        return                              //It was showing NaN because I was trying to operate number that did not exist when onHold was empty.
    } else {
        if (operator === '') {
            eraseWhileOperate();
            operator = nextOperator;
        } else {
            getNumberFromHold();
            eraseWhileOperate();
            operate(a, b);                 
            operator = nextOperator;
        }
    }
}

function getNumberFromHold () {
    a = parseInt(onHold[0].join(''));
    b = parseInt(onHold[1].join(''));
}

function changeOnHold (number) {
    onHold[0] = [number];
    onHold[1] = [];
    onHold[1][0] = 0;                    //Changes the first index to 0 in order to get not a NaN display if 2 operator are pressed together.
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
let onHold = [[], [0]];
let operator = '';
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
addPlusMinusEvent();
addEqualEvent();
addPercentEvent();