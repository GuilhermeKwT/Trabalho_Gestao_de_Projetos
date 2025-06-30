const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let current = "0";
let operator = null;
let previous = null;

function updateDisplay() {
    display.textContent = current.replace(".", ",");
}

function calculate() {
    const a = parseFloat(previous);
    const b = parseFloat(current);
    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b !== 0 ? a / b : "Erro";
        case "%": return a % b;
        default: return b;
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value)) { // número
            current = current === "0" ? value : current + value;
        } else if (value === ",") {
            if (!current.includes(".")) {
                current += ".";
            }
        } else if (value === "AC") {
            current = "0";
            previous = null;
            operator = null;
        } else if (value === "=") {
            if (operator && previous !== null) {
                current = String(calculate());
                operator = null;
                previous = null;
            }
        } else { // operador
            if (value === "X") {
                operator = "*";
            } else {
                operator = value;
            }
            previous = current;
            current = "0";
        }
        updateDisplay();
    });
});

updateDisplay();