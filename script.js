//Reference display element
const display = document.getElementById('display');

// track if we have performed a calculation
let justcalculated = false;

function appendToDisplay(value) {
    console.log("Button pressed", value);

    let currentValue = display.value;

    if (justcalculated && !isNaN(value)) {
        display.value = value; 
        justcalculated = false; 
        return;
    } 

    // If current display show 0 and user enters a number, we wanna replace the 0
    if (currentValue === '0' && !isNaN(value)) {
    display.value = value;
    }

    // If the  current display shows 0 and the user enters decimal, keep the 0
    else if (currentValue === '0' && value === '.') {
        display.value = currentValue + value;
    } else {
        display.value = currentValue + value;
    }

    // Rest thr justcalculated flag when user starts typing again
    justcalculated = false;

    console.log("Display updated to:", display.value);
    
    alert("You pressed: " + value);
}

function clearDisplay() {
    console.log("clear button pressed");

    alert("clear button was pressed");
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

    alert("backspace button was pressed");
}

function calculate() {
    console.log("equals button pressed");

    alert("equals button was pressed");
    
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Claculator script loaded successfully");
    console.log("Display element:", display);

    if (display) {
        display.log('Current display value:', display.value);
    } else {
        console.log('Display element not found');
    }
})
