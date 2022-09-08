var timeEl = document.querySelector(".container");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndext;
var secondsLeft = 60;
var timeoutt = 0;
// // let quizScore = 0;
// let questionCounter = 1;
// let scoreCounter = 5;
// let score = 5;
// let selectedAnswer;
// let maxQuestions = 10;
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndext++;
  setNextQuestion();
  // userScore();
  // timeout();
});
function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = question.sort(() => Math.random() - 0.5);
  currentQuestionIndext = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  // secondsLeft = 5;
  timeout();

  // userScore();
}

// timeout();
// setInterval(timeout, 1000);

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
      secondsLeft < 8;
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
  setStatusClass(document.body, correct);
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
  } else {
    element.classList.add("wrong");
  }
  nextButton.classList.remove("hide");
}

// function userScore() {
//   if (selectAnswer === "correct") {
//     scoreCounter++;
//     setStatusClass.innerText = +score;
//   }
//   console.log("Increase Score");
// }

function clearStatusClass(element) {
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
    question: "The Tallest byliding in the world is located in which city?",
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

// var timeEl = document.querySelector(".container");

// // Selects element by id

// var secondsLeft = 10;

// function setTime() {
//   // Sets interval in variable
//   var timerInterval = setInterval(function () {
//     secondsLeft--;
//     timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

//     if (secondsLeft === 0) {
//       // Stops execution of action at set interval
//       clearInterval(timerInterval);
//       // Calls function to create and append image
//     }
//   }, 1000);
// }
