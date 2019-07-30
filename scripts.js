const inputs = document.querySelectorAll('button')
const display = document.getElementById('display')
const operators = ['+','-','*','/', '=']

function add (array) {
	return result = array.reduce((accumulator, currentValue) => accumulator + currentValue)
}

function subtract (array) {
	return result = array.reduce((accumulator, currentValue) => accumulator - currentValue)
}

function multiply (array) {
	return result = array.reduce((accumulator, currentValue) => accumulator * currentValue)
}

function divide (array) {
	return result = array.reduce((accumulator, currentValue) => accumulator / currentValue)
}

function operate(operator, array) {
    switch (operator) {
        case '+':
            result = add(array)
            break
        case '-':
            result = subtract(array)
            break
        case '*':
            result = multiply(array)
            break
        case '/':
            result = divide(array)
            break
    }

    return result
}

function compute(input) {
    let displayArray = display.value.split('')
    let operatorPressed = operators.indexOf(input) != -1
    let lastValue = displayArray.slice(-1)
    let lastValueOperator = operators.indexOf(lastValue[0]) != -1
    
    if (input == 'clear') { //clear all values
        display.value = '' 
        return 
    }
    else if (input == 'delete') { //delete last value
        displayArray = displayArray.slice(0, -1)
        display.value = displayArray.join('')
        return
    }
    else if (operatorPressed && display.value == '') { //operating on nothing
        return
    }
    //else if (input == '=' && ) {} //solving on no equation
    //else if (input == '.' && ) {} //double decimals
    else if (operatorPressed && lastValueOperator) { //double operators
        return
    }
    //else if (input == '=') {} //solve equation
    else {
        display.value += input
    }

}

inputs.forEach(input => input.addEventListener('click',  (e) => compute(e.target.value)))