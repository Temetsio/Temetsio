// Helper to create div with an id
function divWithId(id) {
  const div = document.createElement("div");
  div.id = id;
  return div;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const KEY_ENTER = "Enter";

function generateNumber() {
  return randInt(-100, 100);
}

function generateOperation() {
  const op = randInt(1, 3);
  return op === 1 ? "+" : (op === 2 ? "−" : "×");
}

const operation = {
  "+": (n1, n2) => n1 + n2,
  "−": (n1, n2) => n1 - n2,
  "×": (n1, n2) => n1 * n2,
};

let result = null;
let currentQuestion = 0;
const maxQuestions = 5;
let correctCount = 0;

function handleInputKeyPressed(e) {
  if (e.key === KEY_ENTER) {
    const userAnswer = Number(e.target.value);
    const messageDiv = document.getElementById("message");
    if (userAnswer === result) {
      messageDiv.innerText = "Correct!";
      correctCount++;
    } else {
      messageDiv.innerText = `Incorrect! Correct answer was ${result}.`;
    }

    // Disable input and show continue button
    e.target.disabled = true;
    submitBtn.style.display = "none";
    continueBtn.style.display = "inline-block";
  }
}

function createMathQuiz() {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("quiz-op-container");

  const operationDiv = document.createElement("div");
  operationDiv.classList.add("quiz-op");

  const messageDiv = divWithId("message");
  messageDiv.classList.add("quiz-op");

  const equalDiv = document.createElement("div");
  equalDiv.innerText = "=";

  const resultInput = document.createElement("input");
  resultInput.id = "result";
  resultInput.setAttribute("type", "number");
  resultInput.addEventListener("keypress", handleInputKeyPressed);

  submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.addEventListener("click", () => {
    // Trigger keypress handler manually for the submit button
    // because user may click instead of pressing enter
    handleInputKeyPressed({ key: KEY_ENTER, target: resultInput });
  });

  continueBtn = document.createElement("button");
  continueBtn.innerText = "Continue";
  continueBtn.style.display = "none";
  continueBtn.addEventListener("click", handleContinue);

  containerDiv.appendChild(operationDiv);
  containerDiv.appendChild(messageDiv);
  containerDiv.appendChild(submitBtn);
  containerDiv.appendChild(continueBtn);

  operationDiv.appendChild(divWithId("n1"));
  operationDiv.appendChild(divWithId("op"));
  operationDiv.appendChild(divWithId("n2"));
  operationDiv.appendChild(equalDiv);
  operationDiv.appendChild(resultInput);

  return containerDiv;
}

function handleContinue() {
  currentQuestion++;
  if (currentQuestion >= maxQuestions) {
    // End quiz: show final score
    document.getElementById("question-container").style.display = "none";
    const root = document.getElementById("root");
    root.innerHTML = `<h2>Quiz finished!</h2><p>You got ${correctCount} out of ${maxQuestions} correct.</p>`;
  } else {
    setupQuestion();
  }
}

function setupQuestion() {
  // Reset input and UI for new question
  const messageDiv = document.getElementById("message");
  const resultInput = document.getElementById("result");

  resultInput.value = "";
  resultInput.disabled = false;
  resultInput.focus();

  messageDiv.innerText = "";

  submitBtn.style.display = "inline-block";
  continueBtn.style.display = "none";

  // Generate question
  const n1 = generateNumber();
  const op = generateOperation();
  const n2 = generateNumber();

  result = operation[op](n1, n2);

  document.getElementById("n1").innerText = n1;
  document.getElementById("op").innerText = op;
  document.getElementById("n2").innerText = n2;
}

let submitBtn, continueBtn;

function handleOnLoad() {
  const container = createMathQuiz();
  container.id = "question-container";
  document.getElementById("root").appendChild(container);
  currentQuestion = 0;
  correctCount = 0;
  setupQuestion();
}
function saveScoreAndShowLeaderboard(playerName, playerScore) {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") ||  "[]");
  leaderboard.push({ name: playerName, score: playerScore });
  leaderboard.sort((a,b) =>  b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  displayLeaderboard("Leaderboard");
  function displayLeaderboard(Leaderboard) {
    const root = documentgetElementById("root);
    root.innerHtml = "<h2>Leaderboard</h2>";
    if (leaderboard.length === 0) {
      root.innerHTML += "<p>No score yet.</p>"
      return
  }
  const list = document.createElement("ol");
    leaderboard.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.name} - ${entry.score}`;
      list.appendChild(li);
    });
    root.appendChild(list);
  }

window.addEventListener("load", handleOnLoad);

