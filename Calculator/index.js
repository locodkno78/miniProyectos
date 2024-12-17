var numberA;
var numberB;
var operation;

function init() {
    var result = document.getElementById('result');
    var division = document.getElementById('division');
    var multiplication = document.getElementById('multiplication');
    var minus = document.getElementById('minus');
    var plus = document.getElementById('plus');
    var equal = document.getElementById('equal');
    var reset = document.getElementById('reset');
    var cero = document.getElementById('cero')
    var one = document.getElementById('one');
    var two = document.getElementById('two');
    var three = document.getElementById('three');
    var four = document.getElementById('four');
    var five = document.getElementById('five');
    var six = document.getElementById('six');
    var seven = document.getElementById('seven');
    var eight = document.getElementById('eight');
    var nine = document.getElementById('nine');

    one.onclick = function (e) {
        result.textContent = result.textContent += 1;
    }
    two.onclick = function (e) {
        result.textContent = result.textContent += 2;
    }
    three.onclick = function (e) {
        result.textContent = result.textContent += 3;
    }
    four.onclick = function (e) {
        result.textContent = result.textContent += 4;
    }
    five.onclick = function (e) {
        result.textContent = result.textContent += 5;
    }
    six.onclick = function (e) {
        result.textContent = result.textContent += 6;
    }
    seven.onclick = function (e) {
        result.textContent = result.textContent += 7;
    }
    eight.onclick = function (e) {
        result.textContent = result.textContent += 8;
    }
    nine.onclick = function (e) {
        result.textContent = result.textContent += 9;
    }
    cero.onclick = function (e) {
        result.textContent = result.textContent += 0;
    }
    reset.onclick = function (e) {
        resetCalculator()
    }
    plus.onclick = function (e) {
        numberA = result.textContent;
        operation = "+";
        clean();
    }
    minus.onclick = function (e) {
        numberA = result.textContent;
        operation = "-";
        clean();
    }
    multiplication.onclick = function (e) {
        numberA = result.textContent;
        operation = "*";
        clean();
    }
    division.onclick = function (e) {
        numberA = result.textContent;
        operation = "/";
        clean();
    }
    equal.onclick = function (e) {
        numberB = result.textContent;
        solve()
    }

    function clean() {
        result.textContent = "";
    }
    function resetCalculator() {
        numberA = "0";
        numberB = "0";
        operation = "";
        result.textContent = "";
    }
    function solve() {
        var res = 0;
        switch (operation) {
            case "+":
                res = parseFloat(numberA) + parseFloat(numberB);
                break;
            case "-":
                res = parseFloat(numberA) - parseFloat(numberB);
                break;
            case "*":
                res = parseFloat(numberA) * parseFloat(numberB);
                break;
            case "/":
                res = parseFloat(numberA) / parseFloat(numberB);
                break;
        }
        // Verificar si es un número entero
        if (Number.isInteger(res)) {
            result.textContent = res; // Mostrar como entero
        } else {
            result.textContent = res.toFixed(2); // Mostrar con 2 decimales
        }
    }
    resetCalculator()
}