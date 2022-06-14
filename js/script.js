const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculo {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // FORMATAR
    formatDisplayNumber(number) {
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // DELETAR O ULTIMO DIGITO
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // CALCULO
    calculate() {
        let result;
        const previousOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if(isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

        switch (this.operation) {
            case '+':
                result = previousOperandFloat + currentOperandFloat;
                break;
            case '-':
                result = previousOperandFloat - currentOperandFloat;
                break;
            case '÷':
                result = previousOperandFloat / currentOperandFloat;
                break;
            case '*':
                result = previousOperandFloat * currentOperandFloat;
                break;
            default:
                return;   
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    chooseOperation(operation) {
        if (this.currentOperand == '') return;
        if (this.previousOperand != '') {
            this.calculate();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    appendNumber(number) {
        if (this.currentOperand.includes('.') && number === '.') return;
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    // DELETAR POR COMPLETO
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    
    // RENDERIZAR NA TELA
    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}
const calculator = new Calculo(
    previousOperandTextElement, 
    currentOperandTextElement
);

for (const numberButton of  numberButtons) {
    numberButton.addEventListener('click',()=>{
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener('click',()=>{
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}

allClearButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click',()=>{
    calculator.calculate();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
});