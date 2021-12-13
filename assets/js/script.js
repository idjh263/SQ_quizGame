var timer = 30;
var runningTimer;
var prize = 0;
var username = "";
var qNumber;
var finalScore;
var startButton = document.getElementById("startButton");
var qContainer = document.getElementById("questionsContainer");
var qElement = document.getElementById("question");
var answerButtons = document.getElementById("answers");
var countdown = document.getElementById("timerArea");
var prizeText = document.getElementById("prizeText");
var highScoresButton = document.getElementById("showScoresButton");


var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

startButton.addEventListener("click", startGame);

highScoresButton.addEventListener("click", displayScores);


function startGame() {
  startButton.classList.add("hide");
  //scoreArea.classList.add("hide");
  answerButtons.classList.remove("hide");
  qNumber = 0;
  qContainer.classList.remove("hide");
  prizeText.innerHTML = "";
  startClock();
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  
  showQuestion(questions[qNumber]);
}



function showQuestion(question) {
  qElement.innerText = question.question;
  question.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}



function startClock() {
  countdown.innerHTML = "Time Left: " + timer;
  if (timer <= 0) {
    gameOver();
  } else {
     timer -= 1;
     runningTimer = setTimeout(startClock, 1000);
   }
}


function selectAnswer(e) {
  var selectedButton = e.target;
  if (!selectedButton.dataset.correct) {
    timer = timer - 5;
    console.log(timer);
  }
  if(selectedButton.dataset.correct ) {
    prize = prize + 9.12;
    console.log(prize);
  }
  if (qNumber == questions.length - 1) {
    gameOver();
  } else {
    clearQuestion();
    qNumber++;
    showQuestion(questions[qNumber]);
    //console.log(score);
  }
}


function clearQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function gameOver() {
  clearInterval(runningTimer);
  countdown.innerHTML = "Finished";
  clearQuestion();
  showResults();
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
  timer = 30;
  prize = 0;
}

function showResults() {
  finalprize = prize;
  if (timer < 0) {
    finalprize = 0;
  }
  qElement.innerText = "";
  prizeText.classList.remove("hide");
  answerButtons.classList.add("hide");
  prizeText.innerHTML = `Your prize is ${finalprize} BILLION 😛!<div id="init">Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
  username = document.getElementById("initials");
  saveButton = document.getElementById("save-btn");
  username.addEventListener("keyup", function() {
    saveButton.disabled = !username.value;
  });
}


function submitScores(e) {
  var prize = {
    prize: finalprize
    ,
    name: username.value
  };
  highScores.push(prize);
  highScores.sort(function (a, b) { return b.prize - a.prize});

  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayScores();
}


function displayScores() {
  clearInterval(runningTimer);
  countdown.innerHTML = "";
  clearQuestion();
  qElement.innerText = "";
  prizeText.classList.remove("hide");

  prizeText.innerHTML = `<h2>High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
  var highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = highScores
    .map(prize => {
      return `<li class="scoresList">${prize.name} - ${prize.prize}</li>`;
    })
    .join("");
  startButton.classList.remove("hide");
  highScoresButton.classList.add("hide");
}


function clearScores() {
  highScores = [];
  highScoresList.innerHTML = "<h3>Cleared</h3>";
  document.getElementById("clearScores").classList.add("hide");
}


const questions = [
  {
    question: "Which is not a face mask symbols?",
    answers: [
      { text: "triangle", correct: false },
      { text: "cross", correct: true },
      { text: "circle", correct: false },
      { text: "square", correct: false }
    ]
  },
  {
    question: "What is the name of the song that plays to wake-up player ang start the game?",
    answers: [
      { text: "Wiener Blut", correct: false },
      { text: "Die Fledermaus", correct: false },
      { text: "The Symphony 7", correct: false },
      { text: "The Blue Danube", correct: true }
    ]
  },
  {
    question: "Who is the director of the series? ",
    answers: [
      { text: "Jung Jae-il", correct: false },
      { text: "Hwang Dong-yuk", correct: true },
      { text: "Bong Joon-ho", correct: false },
      { text: "Oh Il-nam", correct: false },
    ]
  },
  {
    question: "Who is not an actor in the Squid game series ?",
    answers: [
      { text: "Kim Joo-ryoung", correct: false },
      { text: "Jang Tae-joon", correct: true },
      { text: "Yoo Sung-joo", correct: false },
      { text: "Kim Young-ok", correct: false }
    ]
  },
  {
    question: "The doll sang a song during the first game which refers to national flower of Korea, what is the scientific name ",
    answers: [
      { text: "Hibiscus abelmoschus ", correct: false },
      { text: "Hibiscus acicularis", correct: false },
      { text: "Hibiscus syriacus", correct: true },
      { text: "Hibiscus acerifolius", correct: false }
    ]
  },
];