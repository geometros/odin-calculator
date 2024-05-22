let calcState = {
    one: null,
    operator: null,
    two: null,
    display: document.getElementById('display'),
    reset: function() {
        this.one = null;
        this.operator = null;
        this.two = null;
    },
    nextFrame: function(press) {
        if (this.one == null){
            this.one = press;
        }
        else if (this.one != null && this.operator == null){
            this.operator = press;
        } 
        else if (this.one != null && this.operator != null && this.two == null) {
            this.two = press;
        }

        if (press == "="){
            console.log(this.one,this.two,this.operator)
            this.display.textContent = operate(this.one,this.two,buttonOperator(this.operator))
            calcState.reset()
        }
        if (press == "Clear") {
            this.display.textContent = 0;
            calcState.reset()
            }
    },
};

function buttonOperator (str) {
    if (str == "÷"){
        return divide
    }
    if (str == "×"){
        return multiply
    }
    if (str == "-"){
        return subtract
    }
    if (str == "+"){
        return add
    }
    else {
        return null
    }
}

function add (a,b) {
    return a + b;
}
function subtract (a,b) {
    return a - b;
}
function multiply (a,b) {
    return a * b;
}
function divide (a,b) {
    return a / b;
}
function operate (a,b,func) {
    return func(a,b)
}

// Get all buttons on the page
const buttons = document.querySelectorAll('button');

// Add a click listener to each button
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        buttonText = event.target.textContent;
        calcState.nextFrame(buttonText)
    })
})
