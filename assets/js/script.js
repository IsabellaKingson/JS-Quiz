const questions = [
  {
    Q: "What are the primitive data types?",
    A: [
      { text: "String, number, and boolean.", isCorrect: false },
      {
        text: "String, number, boolean, undefined, null, bigint, and symbol.",
        isCorrect: true,
      },
      { text: "Objects, functions, and arrays.", isCorrect: false },
      { text: "Characters, numbers, null, and undefinifed.", isCorrect: false },
    ],
  },
  {
    Q: "In which tag do we attach a JavaScript file to an HTML Document?",
    A: [
      {
        text: "<script>",
        isCorrect: true,
      },
      { text: "<href>", isCorrect: false },
      { text: "<link>", isCorrect: false },
      { text: "<a>", isCorrect: false },
    ],
  },
  {
    Q: "Which answer properly declares and initialized a variable?",
    A: [
      { text: "variable const = value;", isCorrect: false },
      { text: "let value = variable;", isCorrect: false },
      {
        text: "const variable = value;",
        isCorrect: true,
      },
      { text: "var is value", isCorrect: false },
    ],
  },
  {
    Q: "Objects are made up of which type of pairs?",
    A: [
      {
        text: "Key-value",
        isCorrect: true,
      },
      { text: "Index-item", isCorrect: false },
      { text: "Half-whole", isCorrect: false },
      { text: "This-that", isCorrect: false },
    ],
  },
  {
    Q: "What is the scope of a variable declared within a function?",
    A: [
      { text: "Global scope", isCorrect: false },
      { text: "Magnified", isCorrect: false },
      { text: "Broad scope", isCorrect: false },
      {
        text: "Local scope",
        isCorrect: true,
      },
    ],
  },
  {
    Q: "What is used to iterate over a collection of data?",
    A: [
      { text: "A function expression", isCorrect: false },
      {
        text: "A for loop",
        isCorrect: true,
      },
      { text: "An if else statement", isCorrect: false },
      { text: "An each-every statement", isCorrect: false },
    ],
  },
  {
    Q: "Which statement says that 'a' is greater than or equal to 'b'?",
    A: [
      { text: "a === b", isCorrect: false },
      { text: "a > b && a = b", isCorrect: false },
      { text: "a > b", isCorrect: false },
      {
        text: "a >= b",
        isCorrect: true,
      },
    ],
  },
  {
    Q: "What is a reusable block of code that performs a specific task?",
    A: [
      { text: "A bug", isCorrect: false },
      { text: "A string", isCorrect: false },
      {
        text: "A function",
        isCorrect: true,
      },
      { text: "A variable", isCorrect: false },
    ],
  },
  {
    Q: "What method is used to print to the console?",
    A: [
      {
        text: "console.log();",
        isCorrect: true,
      },
      { text: "console.print();", isCorrect: false },
      { text: "console.write();", isCorrect: false },
      { text: "console.please();", isCorrect: false },
    ],
  },
  {
    Q: "Which answer is a conditional statement?",
    A: [
      { text: "A for loop", isCorrect: false },
      {
        text: "An if else statement",
        isCorrect: true,
      },
      { text: "The string, 'conditional'", isCorrect: false },
      { text: "An object", isCorrect: false },
    ],
  },
];
const startPage = $(".start-page");
const game = $(".action");
const secondsLeft = $(".timer");
let timeLeft = 60;
let questionText = $(".question-text");
let currentQuestion = 0;
let answer = $(".answer");
let score = 0;
const startBtn = $(".start-button");
const hideStartPage = function () {
  startPage.css("display", "none");
  game.css("display", "flex");
  const question = $(".question");
};
function setTime() {
  const timer = setInterval(function () {
    timeLeft--;
    secondsLeft.text(timeLeft + " seconds left");
    if (timeLeft === 1) {
      secondsLeft.text(timeLeft + " second left");
    } else if (timeLeft === 0) {
      clearInterval(timer);
    }
  }, 1000);
}
function displayQuestion() {
  questionText.text(questions[currentQuestion].Q);
}
function displayAnswer() {
  answer.each(function (i) {
    let ansEl = $(this);
    let currentAns = questions[currentQuestion].A[i].text;
    ansEl.text(currentAns);
  });
}
function nextQuestion() {
  currentQuestion++;
  displayQuestion();
  displayAnswer();
  displayQNum();
}
function checkAns(event) {
  btnTarget = event;
  let selected = btnTarget.dataset.choice;
  if (questions[currentQuestion].A[selected].isCorrect) {
    score++;
    displayScore();
    nextQuestion();
  } else {
    timeLeft -= 10;
    displayScore();
    nextQuestion();
  }
}
function displayScore() {
  let scoreText = $(".score");
  scoreText.text("Score: " + score);
}
answer.on("click", function (event) {
  event.preventDefault();
  checkAns(event.target);
});
function displayQNum() {
  let qNum = $(".question-number");
  qNum.text("Question " + currentQuestion + " of 10");
}

startBtn.on("click", function (event) {
  event.preventDefault();
  hideStartPage();
  setTime();
  displayQuestion();
  displayAnswer();
  displayQNum();
});
