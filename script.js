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
        numbers.push(divs[i].querySelector('.number'));
    }
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', function () {
            getNumberValues(numbers[i]);
        });
    }
}

function getNumberValues (number) {
    if (operator === '') {
        onHold[0].push(number.textContent);
        inScreen.push(number.textContent);
        display(inScreen);
    } else {
        onHold[1].push(number.textContent);
        inScreen.push(number.textContent);
        display(inScreen);
    }
}

function addKeyNumberEvents () {
    const divs = document.querySelectorAll('.bNumber');
    const numbers = [];
    const numberCodes = [];
    for (let i = 0; i < divs.length; i++) {
        numbers.push(divs[i].querySelector('.number'));
        document.addEventListener('keydown', function (e) {
            if (numbers[i].textContent === e.key) {
                getNumberValues(numbers[i]);
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
    document.addEventListener('keydown', function (e) {
        if ('+' === e.key) {  //It uses the string, because if I use textContent it gives back the plus sign with many spaces. And it can't be equal to the event.key.
            operateLogic('add');
        }
    })
}

function addSubsteactEvent () {
    const substract = document.querySelector('#Minus');
    addPointerStyle(substract);
    substract.addEventListener('click', function () {
        operateLogic('substract');
    });
    document.addEventListener('keydown', function (e) {
        if ('-' === e.key) {  //It uses the string, because if I use textContent it gives back the plus sign with many spaces. And it can't be equal to the event.key.
            operateLogic('substract');
        }
    })
}

function addMultiplyEvent () {
    const multiply = document.querySelector('#Times');
    addPointerStyle(multiply);
    multiply.addEventListener('click', function () {
        operateLogic('multiply');
    })
    document.addEventListener('keydown', function (e) {
        if ('*' === e.key) {  //It uses the string, because if I use textContent it gives back the plus sign with many spaces. And it can't be equal to the event.key.
            operateLogic('multiply');
        }
    })
}

function addDividerEvent () {
    const divider = document.querySelector('#Divider');
    addPointerStyle(divider);
    divider.addEventListener('click', function () {
        operateLogic('divide');
    });
    document.addEventListener('keydown', function (e) {
        if ('/' === e.key) {  //It uses the string, because if I use textContent it gives back the plus sign with many spaces. And it can't be equal to the event.key.
            operateLogic('divide');
        }
    })
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
    const AC = document.querySelector('#bAC');
    
    addPointerStyle(equal);
    let newOperator;
    let c;
    equal.addEventListener('click', function () {
        if (!newOperator) {             //This block makes it posssible for the calculator to the same operation repeatidly just pressing equal.
            newOperator = operator;     // Saves operator to do it multiple times
            getNumberFromHold();        // gets number for in the tnext line save C and remember it.
            c = b;
        }
        if (c) {                    
            operateLogic(newOperator, c);
        } else if (operator === '') { //Makes nothing if operator is empty, which means that nothing has been pressed so far.
            return;                                      
        } else {
            operateLogic('');
        }
    })
    AC.addEventListener('click', function () {  // Adds another AC listener in order to erase the local variables new Operator and C.
        newOperator = "";                           
        c = null;
    });
    document.addEventListener('keydown', function (e) {
        console.log(c)
        if ('Enter' === e.key) {  //It uses the string, because if I use textContent it gives back the plus sign with many spaces. And it can't be equal to the event.key.
        if (!newOperator) {             //This block makes it posssible for the calculator to the same operation repeatidly just pressing equal.
            newOperator = operator;     // Saves operator to do it multiple times
            getNumberFromHold();        // gets number for in the tnext line save C and remember it.
            c = b;
        }
        if (c) {                    
            operateLogic(newOperator, c);
        } else if (operator === '') { //Makes nothing if operator is empty, which means that nothing has been pressed so far.
            return;                                      
        } else {
            operateLogic('');
        }
        }
    });
    //Make an event per operator, to set the variable c equal to null. So we can have normal operation by the logic thats before this statement.
    const operators = document.querySelectorAll('.bOperator');
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', function () {
            c = null;
        })
    }
    //Now we'll create the same event with keyboards.
    document.addEventListener('keydown', function (e) {
        if ('+' === e.key || '-' === e.key || '*' === e.key || '/' === e.key) {  //Using the string because text.content is returning the operator plus spaces.
            c = null;
        }
    });
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
        } else {
            // It first operates 
            operateLogic('divide');
            //Divides by 100.
            onHold[1][0] = 100;
            operateLogic('');
        }
    })
}

function operateLogic (nextOperator, c) {
    if (onHold[0].length == 0) {            //This logic prevents the display to show NaN if 2 operator are pressed before any number.
        return                              //It was showing NaN because It was trying to operate number that did not exist when onHold was empty.
    } else {
        if (operator === '') {
            eraseWhileOperate();
            operator = nextOperator;
        }  else if (c) {
            getNumberFromHold();
            eraseWhileOperate();
            operate(a, c);                 
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
    const rows = document.querySelectorAll('.buttonRow');
    for (let i = 0; i < rows.length; i ++) {
        const buttons = rows[i].querySelectorAll('.button');
        for (let j = 0; j < buttons.length; j++) {
            //Get RGB
            const backgroundRGB = window.getComputedStyle(buttons[j]).getPropertyValue('background-color');   
            //Get only the numbers of the RGB. 
            const stringNumbers = backgroundRGB.substring(4, backgroundRGB.length -1);
            const colorNumbers = stringNumbers.split(',');
            let red = Number(colorNumbers[0]);
            let green = Number(colorNumbers[1]);
            let blue = Number(colorNumbers[2]);
            buttons[j].addEventListener('mousedown', function () {
                red += 25;
                green += 25;
                blue += 25;
                buttons[j].style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            })
            buttons[j].addEventListener('mouseup', function () {
                red -= 25;
                green -= 25;
                blue -= 25;
                buttons[j].style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            });
        }
        
    }
    
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
changeColor();
addKeyNumberEvents();