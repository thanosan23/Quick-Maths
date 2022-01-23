// global variables
const questionsToDo = 15;
const operations = ["+", "-", "x"];
let questionsInfo = [];
let answer, total, correct, equation, start;

// displays
const equationDisplay = document.getElementById("equation");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

// getting user input
const answerInput = document.getElementById("answerBox");
const answerForm = document.getElementById("answerForm");

// containers
const startgameContainer = document.getElementById("startgameContainer");
const questionContainer = document.getElementById("questionContainer");
const endgameContainer = document.getElementById("endgameContainer");

// buttons
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const backBtn = document.getElementById("toEndgameContainer");

// questions
const questionNumber = document.getElementById("questionNumber");

// analysis of user input
const questionsAnalysis = document.getElementById("analysis");
const analysisContainer = document.getElementById("analysisContainer");
const viewAnalysisBtn = document.getElementById("viewAnalysis");

// functions 
function play() {
  questionsInfo = [];
  total = 0;
  correct = 0;
  generateRandomQuestion();
  startgameContainer.classList.add('hide');
  endgameContainer.classList.add('hide');
  restartBtn.classList.add('hide');
  analysisContainer.classList.add('hide');
  questionContainer.classList.remove('hide');
  answerInput.focus();
  start = Date.now();
}

function endGame() {
  document.body.style.overflowY = "hidden";
  document.body.style.height = "90vh";
  questionsAnalysis.innerHTML = '';
  scoreDisplay.innerText = 'score: ' + correct.toString() + '/' + total.toString();
  endgameContainer.classList.remove('hide');
  questionContainer.classList.add('hide');
  restartBtn.classList.remove('hide');
  analysisContainer.classList.add('hide');
  var time = new Date(0);
  time.setSeconds(Math.floor((Date.now() - start) / 1000));
  timeDisplay.innerHTML = time.toISOString().substr(11, 8);
}

function analyse() {
  const red = "#fa2525";
  for (let i = 0; i < questionsInfo.length; i++) {
    var currentQuestion = questionsInfo[i];
    var questionNumber = document.createElement("h4");
    questionNumber.innerHTML = "Question " + (i + 1).toString();
    var userAnswer = document.createElement("p");
    userAnswer.innerHTML = "You said " + currentQuestion[0] + " = " + currentQuestion[1];
    var actualAnswer = document.createElement("p");
    actualAnswer.innerHTML = "Correct answer is " + currentQuestion[2];
    if (currentQuestion[1] != currentQuestion[2]) {
      questionNumber.style.color = red;
      userAnswer.style.color = red;
      actualAnswer.style.color = red;
    }

    userAnswer.style.fontSize = "14px";
    actualAnswer.style.fontSize = "14px";
    questionsAnalysis.appendChild(questionNumber);
    questionsAnalysis.appendChild(userAnswer);
    questionsAnalysis.appendChild(actualAnswer);
  }
}

function generateRandomQuestion() {
  total++;
  questionNumber.innerHTML = total;
  var a = Math.floor(Math.random() * 21);
  var b = Math.floor(Math.random() * 21);
  var operation = operations[Math.floor(Math.random() * operations.length)];
  if (operation == "+") {
    answer = a + b;
  } else if (operation == "-") {
    answer = a - b;
  } else if (operation == "x") {
    answer = a * b;
  }
  equation = a.toString() + ' ' + operation + ' ' + b.toString();
  equationDisplay.innerText = equation;
}

// event listeners
startBtn.addEventListener('click', (e) => {
  play();
});

restartBtn.addEventListener('click', (e) => {
  play();
});

backBtn.addEventListener('click', (e) => {
  endGame();
});

viewAnalysisBtn.addEventListener('click', (e) => {
  analyse();
  endgameContainer.classList.add('hide');
  questionContainer.classList.add('hide');
  restartBtn.classList.add('hide');
  analysisContainer.classList.remove('hide');
  document.body.style.overflowY = "visible";
  document.body.style.height = "230vh";
});

answerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  var userAnswer = parseInt(answerInput.value);
  questionsInfo.push([equation, userAnswer, answer]);
  if (userAnswer == answer) {
    correct++;
  }
  answerInput.value = '';
  answerInput.focus();
  if (total < questionsToDo) {
    generateRandomQuestion();
  } else {
    endGame();
  }
});