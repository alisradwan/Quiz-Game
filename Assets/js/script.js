var timeEl = document.querySelector(".container");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var highscore = document.getElementById("highscore");
var answerButtonsElement = document.getElementById("answer-buttons");
var Userame = document.querySelector(".Userame");
var savebtn = document.getElementById("Save");
var User = document.getElementById("User");
let shuffledQuestions, currentQuestionIndext;
var secondsLeft = 60;
var timeoutt = 0;
let currentquestion = 0;
var scoreDisplay = document.getElementById("score");

let score = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndext++;
  setNextQuestion();
});
function startGame() {
  startButton.classList.add("hide");
  Userame.setAttribute("class", "hide");
  shuffledQuestions = question.sort(() => Math.random() - 0.5);
  currentQuestionIndext = 0;
  questionContainer.classList.remove("hide");

  setNextQuestion();
  timeout();
}

function timeout() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    document.getElementById("time").innerHTML = secondsLeft + " Seconds left.";
    if (secondsLeft < 0) {
      alert("Game over");
      clearInterval(timerInterval);
      startButton.classList.remove("hide");
      questionContainer.classList.add("hide");
      secondsLeft = 50;
    }
  }, 1000);
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndext]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answer.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.Text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    } else {
      secondsLeft--;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  console.log(selectedButton.dataset);
  setStatusClass(document.body, correct);
  score = score - 1;
  scoreDisplay.innerHTML = score;

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndext + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    nextButton.classList.add("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
    score = score + 1;
    scoreDisplay.innerHTML = score;
  } else {
    console.log(setStatusClass);
    element.classList.add("wrong");
  }
  nextButton.classList.remove("hide");
}

function clearStatusClass(element) {
  console.log(element);
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

var question = [
  {
    question:
      "Demolition of the Berlin wall separating East and West Germany began in what year?",
    answer: [
      { Text: "1989", correct: true },
      { Text: "1998", correct: false },
      { Text: "1898", correct: false },
      { Text: "1889", correct: false },
    ],
  },
  {
    question: "The Tallest building in the world is located in which city?",
    answer: [
      { Text: "Vancouver", correct: false },
      { Text: "Portland", correct: false },
      { Text: "Dubai", correct: true },
      { Text: "New York", correct: false },
    ],
  },
  {
    question: "How many languages are written from right to left?",
    answer: [
      { Text: "2", correct: false },
      { Text: "8", correct: false },
      { Text: "9", correct: false },
      { Text: "12", correct: true },
    ],
  },
  {
    question:
      "What is the name of the biggest technology company in South Korea?",
    answer: [
      { Text: "Samsung", correct: true },
      { Text: "Apple", correct: false },
      { Text: "plusone", correct: false },
      { Text: "flip phone", correct: false },
    ],
  },
];

function safehighscore() {
  var newscore = {
    scoreEl: score,
    name: User.value,
  };
  var scoreArray = JSON.parse(localStorage.getItem("scores")) || [];
  scoreArray.push(newscore);
  localStorage.setItem("scores", JSON.stringify(scoreArray));
}

highscore.onclick = safehighscore;

function showscore() {
  var scoreArray = JSON.parse(localStorage.getItem("scores")) || [];
  scoreArray.forEach(function (Item) {
    var listitem = document.createElement("li");
    listitem.textContent = Item.name + ":" + Item.scoreEl;
    var socrelist = document.getElementById("scorelist");
    socrelist.appendChild(listitem);
  });
}
showscore();
