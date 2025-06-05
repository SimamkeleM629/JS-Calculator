//Reference display element
const display = document.getElementById('display');

// track if we have performed a calculation
let justcalculated = false;

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function getLastCharacter() {
    return display.value.slice(-1);
}

function safeEval(expression) {
    try {
        let jsExpression = expression
            .replace(/×/g, '*') // Replace multiplication symbol
            .replace(/÷/g, '/'); // Replace division symbol

        if (!/^[0-9+\-*/()]+$/.test(jsExpression)) {
            throw new Error("Invalid characters in expression");
        }

        const result = Function('"use strict";return (' + jsExpression + ')')();

        if (!isFinite(result)) {
            throw new Error("Invalid calculation result");
        }
        return result;
    } catch (error) {
        console.error("calculation error:", error);
        return 'Error';
    }
}

function appendToDisplay(value) {
    console.log("Button pressed", value);

    let currentValue = display.value;

    if (justcalculated && !isNaN(value)) {
        display.value = value; 
        justcalculated = false; 
        return;
    } 

    if (justcalculated && isOperator(value)) {
        display.value = currentValue + value;
        justcalculated = false;
        return;
    }

    //Handles operators
    if (isOperator(value)) {
        // Dont allow operator as first char exception for minus
        if (currentValue === '0' && value !== '-') {
        return; // Do nothing
        }

        // If last character is already an operator, replace it
        if (isOperator(getLastCharacter())) {
            display.value = currentValue.slice(0, -1) + value;
        } else {
            display.value = currentValue + value;
        }
    } else if (!isNaN(value)) {
        if (currentValue === '0') {
            display.value = value; // Replace 0 with the new number
        } else {
            display.value = currentValue + value; // Append the number
        }
    } else if (value === '.') {
        if (currentValue === '0') {
        display.value = currentValue + value;
        } else {
            // Get the last number in the display after the last operator
            let parts = currentValue.split(/[\+\-\*\/]/);
            let lastNumber = parts[parts.length - 1];

            // Only add the decimal if the current number doesn't have one
            if (!lastNumber.includes('.')) {
                display.value = currentValue + value;
            }
        }
    }  else {
        display.value = currentValue + value;
    }

    // Rest the justcalculated flag when user starts typing again
    justcalculated = false;

    console.log("Display updated to:", display.value);  
}

function clearDisplay() {
    console.log("clear button pressed.");

    display.value = '0';
    justcalculated = false; 

    display.style.backgroundColor = '#f0f0f0'; 
    setTimeout(() => {
    display.style.backgroundColor = ''; 
    }, 150);

}

function deleteLast() {
    console.log("backspace button pressed");
    
    let currentValue = display.value;

    // If there is only one character or its 0, reset to 0
    if (currentValue.length <= 1 || currentValue === '0') {
        display.value = '0';
        } else {
        display.value = currentValue.slice(0, -1);
    }
}

function calculate() {
    let expression = display.value;

    //Do not allow empty calculation or if display is just a 0
    if (expression === '' || expression === '0') {
        return;
    }

    //Do not calculate if the last character is an operator
    if (isOperator(getLastCharacter())) {
        return;
    }

    let result = safeEval(expression);

    if (result === 'Error') {
        display.value = 'Error';
        setTimeout(() => {
            clearDisplay();
        }, 2000);
    } else {
        if (Number.isFinite(result)) {
            display.value = result.toString();
        } else {
            display.value = parseFloat(result.toFixed(10)).toString();
        }

        justcalculated = true; // Set the flag to indicate a calculation was performed
    }
    
    display.style.backgroundColor = '#e8f5e9'; // Change background color to indicate calculation
    setTimeout(() => {
        display.style.backgroundColor = ''; // Reset background color after a short delay
    }, 300);
}
document.addEventListener('keydown', function(event) {
    console.log("Key pressed:", event.key);
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+' ){
        appendToDisplay('+');
    } else if (event.key === '-') {
        appendToDisplay('-');
    } else if (event.key === '*') {
        appendToDisplay('*');
    } else if (event.key === '/') {
        event.preventDefault(); 
        appendToDisplay('/');
    } 
    else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'Del') {
        deleteLast();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    }
    
})

document.addEventListener('DOMContentLoaded', function() {
    console.log("Claculator script loaded successfully");
    console.log("Display element:", display);

    if (display) {
        console.log('Current display value:', display.value);
    } else {
        console.log('Display element not found');
    }
})
