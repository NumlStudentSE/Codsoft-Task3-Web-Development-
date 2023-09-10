document.addEventListener("DOMContentLoaded", function () {
    const output = document.getElementById("output");
    const inputbuttons = document.querySelectorAll("button");
    const themeCheck = document.getElementById("themecheck");

    let input1 = "";
    let operator = "";
    let input2 = "";

    inputbuttons.forEach((button) => {
        button.addEventListener("click", function () {
            const value = button.textContent;

            if (value === "=") {
                processResult();
            } else if (value === "C") {
                clear();
            } else if (value === "%") {
                findRemainder("%");
            } else if (value === "DEL") {
                backspace();
            } 
            else {
                input1 += value;
                resultScreen();
            }
        });
    });

  
    document.addEventListener("keydown", function (event) {
        const key = event.key;

        if (/[0-9+\-*/.=]|Enter|Escape/i.test(key)) {
            event.preventDefault(); 

            if (key === "=" || key === "Enter") {
                processResult;
            } else if (key === "C" || key === "Escape") {
                clear();
            } else {
                input1 += key;
                resultScreen();
            }
        }
    });

    function processResult() {
        try {
            if (input1 === "") {
                return;
            }
            
            output.value = input1 + operator;

            if (operator === "%") {
                const x = parseFloat(input2);
                const y = parseFloat(input1);

                if (isNaN(x) || isNaN(y)) {
                    throw new Error("Incorrect Value");
                }

                input1 = (x % y).toString();
            } else {
                
                const sanitizedInput = input1.replace(/[^-()\d/*+.]/g, ""); 
                const evaluateValue = eval(sanitizedInput); 

                if (isNaN(evaluateValue) || !isFinite(evaluateValue)) {
                    throw new Error("Incorrect Value");
                }

                input1 = evaluateValue.toString();
            }

            input2 = "";
            operator = "";
            resultScreen();
        } catch (exception) {
            input1 = "Exception";
            input2 = "";
            operator = "";
            resultScreen();
        }
    }

    function findRemainder(modulo_operator) {
        if (input1 !== "") {
            operator = modulo_operator;
            input2 = input1;
            input1 = "";
            resultScreen();
        }
    }
    function backspace() {
        input1 = input1.slice(0, -1);
        resultScreen();
    }

    function clear() {
        input1 = "";
        operator = "";
        input2 = "";
        resultScreen();
    }

    function resultScreen() {
        output.value = input1;
    }

    themeCheck.addEventListener("change", function () {
        document.body.classList.toggle("dark-theme");
    });
});