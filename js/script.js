const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");
const first = document.querySelector(".first")
const secound = document.querySelector(".secound")
const third = document.querySelector(".third")
const fourth = document.querySelector(".fourth")
var img = document.createElement("img");
img.src = "";
var src = document.getElementById("sprites");
src.appendChild(img);
document.body.style.zoom = "100%" 

first.addEventListener("click", function(){
  this.classList.add("invisible");
  secound.classList.remove("invisible")
  document.body.classList.add("great")
  
});

secound.addEventListener("click", function(){
  this.classList.add("invisible");
  third.classList.remove("invisible")
  document.body.classList.remove("great")
  document.body.classList.add("ultra")
});

third.addEventListener("click", function(){
  this.classList.add("invisible");
  fourth.classList.remove("invisible")
  document.body.classList.remove("ultra")
  document.body.classList.add("master")
});

fourth.addEventListener("click", function(){
  this.classList.add("invisible");
  first.classList.remove("invisible")
  document.body.classList.remove("master")
  
});



class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

 
  addDigit(digit) {
   
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }


  processOperation(operation) {
   
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    let prevback = this.previousOperationText.innerText;
    if (operationValue === null) {

      this.currentOperationText.innerText += this.currentOperation;
    } else {
    
      if (previous === 0) {
        operationValue = current;
      }
    
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }

    if (previousOperationText.innerText !=="" && prevback!== this.previousOperationText.innerText){
        let sprite = Math.round(parseInt(previousOperationText.innerText.split(" ")[0]))
     if (sprite<=1008 && sprite >=0){
      let randomNumber = Math.floor(Math.random()*5)
      if (sprite <= 905 && randomNumber == 1){
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${(sprite)}.png`;
      }else{
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(sprite)}.png`;}
      console.log(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${previousOperationText.innerText.split(" ")[0]}.png`)
      console.log(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.round(previousOperationText.innerText.split(" ")[0])}.png`)
      var src = document.getElementById("sprites");
      src.appendChild(img);}else{
        img.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
        var src = document.getElementById("sprites");
        src.appendChild(img);
       

      }
    }
    
    

    
  }

 
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }


  processDelOperator() {
    this.currentOperationText.innerText =
    this.currentOperationText.innerText.slice(0, -1);
  }


  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
    
  }


  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
    img.src = "";
    var src = document.getElementById("sprites");
    src.appendChild(img);
  }

  
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});