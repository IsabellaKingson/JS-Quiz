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
const startPageHeader = $(".start-page-header");
const game = $(".action");
const secondsLeft = $(".timer");
let timeLeft = 60;
let questionText = $(".question-text");
let questionIndex = 0;
let answer = $(".answer");
let score = 0;
const startBtn = $(".start-button");
const startPageToggle = function () {
  startPage.toggle();
  startPageHeader.toggle();
  game.toggle();
  const question = $(".question");
};
function setTime() {
  const timer = setInterval(function () {
    timeLeft--;
    secondsLeft.text(timeLeft + " seconds left");
    if (timeLeft === 1) {
      secondsLeft.text(timeLeft + " second left");
    } else if (timeLeft <= 0) {
      clearInterval(timer);
      results();
    }
  }, 1000);
}
function displayQuestion() {
  questionText.text(questions[questionIndex].Q);
}
function displayAnswer() {
  answer.each(function (i) {
    let ansEl = $(this);
    let currentAns = questions[questionIndex].A[i].text;
    ansEl.text(currentAns);
  });
}
function nextQuestion() {
  questionIndex++;
  if (questionIndex < questions.length) {
    displayQuestion();
    displayAnswer();
    displayQNum();
  } else {
    results();
    return;
  }
}
function checkAns(event) {
  btnTarget = event;
  let selected = btnTarget.dataset.choice;
  if (questions[questionIndex].A[selected].isCorrect) {
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
  let qNum = $(".question-num");
  currentQuestion = questionIndex + 1;
  qNum.text("Question " + currentQuestion + " of 10");
}

let submitBtn = $("#submit-results");
function results() {
  game.toggle();
  $(".results").toggle();
  let userScore = $("#user-score");
  userScore.text(score);
  let userInitials = $("#initials");
  let userEntry = {
    initials: userInitials,
    scored: score,
  };
  submitBtn.on("click", function (event) {
    event.preventDefault();
    localStorage.setItem("userEntry", JSON.stringify(userEntry));
    addHighScore();
    startPageToggle();
  });
}
function addHighScore() {
  let newEntry = JSON.parse(localStorage.getItem("userEntry"));
  let scoresEl = $(".scores");
  let newInitials = $("<p>");
  newInitials.text(newEntry.userInitials);
  scoresEl.append(newInitials);
  let newScore = $("<p>");
  newScore.text(newEntry.userScore);
  scoresEl.append(newScore);
}
startBtn.on("click", function (event) {
  event.preventDefault();
  startPageToggle();
  setTime();
  displayQuestion();
  displayAnswer();
  displayQNum();
  return;
});

highScoresBtn = $("#show-high-scores");
rulesBtn = $("#show-rules");

highScoresBtn.on("click", function () {
  startPage.toggle();
  $(".high-scores").toggle();
  rulesBtn.toggle();
});

rulesBtn.on("click", function () {
  startPage.toggle();
  $(".rules").toggle();
  highScoresBtn.toggle();
});
