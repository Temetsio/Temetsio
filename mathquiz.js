// mathquiz.js
function myFuntion() { 
document.getElementById("Click").addEventListener("click", myFuntion)
}
function generateNumber() { // between -100 - 100
    return randInt(-100, 100)
}

function generateOperation() {
    const op = randInt(1, 3)
    return op == 1 ? "+" : (op == 2 ? "−" : "×")
}

let result = null

function handleInputKeyPressed(e) {
    if (e.key === KEY_ENTER) {
        console.log("user input is", e.target.value)

        const message = result == e.target.value ? "Correct!" : "Incorrect!"

        document.getElementById("message").innerText = message
    }
}

const operation = {
    "+": (n1, n2) => n1 + n2,
    "−": (n1, n2) => n1 - n2,
    "×": (n1, n2) => n1 * n2,
}

function createMathQuiz() {
    const containerDiv = document.createElement("div")
    containerDiv.classList.add("quiz-op-container")

    const operationDiv = document.createElement("div")
    operationDiv.classList.add("quiz-op")
    
    const messageDiv = divWithId("message")
    messageDiv.classList.add("quiz-op")

    const equalDiv = document.createElement("div")
    equalDiv.innerText = "="
    
    const resultInput = document.createElement("input")
    resultInput.id = "result"
    resultInput.setAttribute("type", "number")
    resultInput.addEventListener("keypress", handleInputKeyPressed)

    containerDiv.appendChild(operationDiv)
    containerDiv.appendChild(messageDiv)

    operationDiv.appendChild(divWithId("n1"))
    operationDiv.appendChild(divWithId("op"))
    operationDiv.appendChild(divWithId("n2"))
    operationDiv.appendChild(equalDiv)
    operationDiv.appendChild(resultInput)

    return containerDiv
}

function handleOnLoad(e) {

    const container = createMathQuiz()
    document.getElementById("root").appendChild(container)

    const n1 = generateNumber()
    const op = generateOperation()
    const n2 = generateNumber()

    result = operation[op](n1, n2)

    document.getElementById("n1").innerText = n1
    document.getElementById("op").innerText = op
    document.getElementById("n2").innerText = n2
}

addEventListener("load", handleOnLoad)