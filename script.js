const ops = ["+","-","×","÷"];
const nums = ["1","2","3","4","5","6","7","8","9","0"]

let calcState = {
    one: "0", //register for first number, holds str
    operator: null, //holds operator as str
    two: null, //register for second number
    computed: true, //is the displayed number computed from a prev operation?
    point: false, //has a point been entered in current register? should be false if computer is true
    display: document.getElementById('display'),
    reset: function(newOperand) {
        this.one = newOperand;
        this.operator = null;
        this.two = null;
        this.computed = true;
        this.point = false;
    },
    nextFrame: function(press) { //this is where all logic for what to do when a certain button is pressed goes
        if (ops.includes(press)){
            if (this.operator == null){ //if display does not contain an operator, then add one. this.one isn't considered as it always holds a value
                this.display.textContent = this.one + press;
                this.operator = press;
                this.point = false;
                this.computed = false;
            } else if (this.operator != null && this.two == null){ //if display contains an operator but no second operand, replace operator
                this.display.textContent = this.one + press; //logic could be simplified by turning the above into an or statement but I want it explicit
                this.operator = press;
            } else if (this.operator != null && this.two != null){ //if display already contains two operands and an operator, then compute the value and display value and new operator
                this.reset(operate(this.one,this.two,buttonOperator(this.operator)))
                this.display.textContent = this.one + press;
                this.operator = press;
                this.point = false;
                this.computed = false; //when operator is pressed on a complete expression, result is operand + operator, for 2nd operand, not a single computed operand
            }
        }
        if (nums.includes(press)){
            if (this.computed){ //if display shows a computed value, we want any number press to replace that value
                this.display.textContent = press;
                this.one = press;
                this.computed = false;
            } else {
                this.display.textContent += press;
                if (this.operator == null) {//handle if we are in first or second operand
                    this.one += press;
                } else {
                    this.two == null ? this.two = press : this.two += press; //concatenation with null does not produce expected behavior, instantiating to "" might be cleaner
                }
            }
        }
        if (press == "."){
            if (this.computed){
                this.display.textContent = press;
                this.one = press;
                this.computed = false;
            } else {
                if (!this.point){ //if no decimal, add one, if there already is one, then do nothing. make sure to set point to false in operator section above
                    this.display.textContent += press;
                    this.point = true;
                    if (this.operator == null) { //apply decimal to first register if no operator is entered yet, otherwise apply to second register
                        this.one += press;
                    } else {
                        this.two == null ? this.two = press : this.two += press;
                    }
                }
            }
        }
        if (press == "="){
            this.display.textContent = operate(this.one,this.two,buttonOperator(this.operator));
            calcState.reset(this.display.textContent)
        }
        if (press == "Clear") {
            this.display.textContent = 0;
            calcState.reset(0)
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
function operate (a,b,func) { //expect str,str,function
    return func(Number(a),Number(b))
}

// Get all buttons on the page
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => { // Add a click listener to each button
    button.addEventListener('click', (event) => {   
        buttonText = event.target.textContent;
        calcState.nextFrame(buttonText)
    })
})
buttons.forEach((button) => { // Add a keypress listener to the document for each button
    document.addEventListener('keydown', function (event) { 
        if(event.key == button.textContent){
            button.click()
        }
    })
})
