//Reference display element
const display = document.getElementById('display');

// track if we have performed a calculation
let justcalculated = false;

function appendToDisplay(value) {
    console.log("Button pressed", value);
    
    alert("You pressed: " + value);
}

function clearDisplay() {
    console.log("clear button pressed");

    alert("clear button was pressed");
}

function deleteLast() {
    console.log("backspace button pressed");

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
