const inputs = document.querySelectorAll('button')
const display = document.getElementById('display')
const operators = ['+','-','*','/', '=']

function add (array) {
	return array.reduce((accumulator, currentValue) => accumulator + currentValue)
}

function subtract (array) {
	return array.reduce((accumulator, currentValue) => accumulator - currentValue)
}

function multiply (array) {
	return array.reduce((accumulator, currentValue) => accumulator * currentValue)
}

function divide (array) {
	return array.reduce((accumulator, currentValue) => accumulator / currentValue)
}

function operate(operator, array) {
    switch (operator) {
        case '+':
            return add(array)
        case '-':
            return subtract(array)
        case '*':
            return multiply(array)
        case '/':
            return divide(array)
    }
}
function calculate(array){

    while (array.length > 1) {
        while ((array.includes('*') || array.includes('/'))) {
            for (let element of array) {
                if (element == '*' || element == '/') {
                    let operator = array.indexOf(element)
                    let leftOperand = operator - 1;
                    let rightOperand = operator + 1;
                    let result = operate(array[operator], [parseFloat(array[leftOperand]), parseFloat(array[rightOperand])])
                    array.splice(leftOperand, 3, result);
                    console.log('equationArray:' + array)
                    break //restart iteration to avoid skipping order of operations since array has been spliced
                }
            }
        }
        while ((array.includes('+') || array.includes('-'))) {
            for (let element of array) {
                if (element == '+' || element == '-') {
                    let operator = array.indexOf(element)
                    let leftOperand = operator - 1;
                    let rightOperand = operator + 1;
                    let result = operate(array[operator], [parseFloat(array[leftOperand]), parseFloat(array[rightOperand])])
                    array.splice(leftOperand, 3, result);
                    console.log('equationArray:' + array)
                    break //restart iteration to avoid skipping order of operations since array has been spliced
                }
            }
        }
    }
    //test equation
    //12 + 7 - 5 * 3 + 12 + 7 - 5 * 3 = 8
    return array[0];    
}

function compute(input) {
    const displayArray = display.value.split('')

    const inputIsOperator = operators.indexOf(input) != -1
    const prevInput = displayArray.slice(-1).join('')
    const prevInputIsOperator = operators.indexOf(prevInput) != -1

    const regNumber = /[0-9]\.*[0-9]*/g
    const regOperator = /[+\-*/]/g
    const regNumbersOperators = /[0-9]\.*[0-9]*|[+\-*/]/g

    const currentNumber = display.value.split(regOperator).pop()
    const currentOperator = display.value.split(regNumber).filter(x => x).pop()
    
    const numbersArray = display.value.split(regOperator).filter(x => x)
    const operatorsArray = display.value.split(regNumber).filter(x => x)
    const equationArray = display.value.match(regNumbersOperators)

    if (input == 'clear') { //clear all values
        display.value = ''
        return 
    }
    else if (input == 'delete') { //delete last value
        display.value = displayArray.slice(0, -1).join('') 
        return
    }
    else if (inputIsOperator && display.value == '') { //operating on nothing
        alert('Cannot operate on nothing.')
        return
    }
    else if (input == '.' && currentNumber.includes('.') ) { //double decimals
        alert('Cannot have double decimals.')
        return
    }
    else if (input == '.' && currentNumber == ''){ //add leading zeros for regNumber
        display.value += '0.'
    }
    else if (inputIsOperator && (currentNumber == '0.' || currentNumber == '0')) { //operating on zero
        alert('Cannot operate on zero.')
        return
    }
    else if (inputIsOperator && prevInputIsOperator) { //double operators
        alert('Cannot have an operator followed by another operator.')
        return
    }
    else if (input == '=' && (currentNumber == '' || currentNumber == '0.' || currentOperator == '')) { //no equation to solve
        alert('No equation to solve.')
        return
    }
    else if (input == '=') { //solve equation

        console.log('equationArray:' + equationArray)
        
        let result = calculate(equationArray)
        display.value = Math.round(result * 100)/100
    }
    else {

        display.value += input
    }

}

inputs.forEach(input => input.addEventListener('click',  (e) => compute(e.target.value)))