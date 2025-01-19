// Variables
var score = 0;
var currentQ = 0;

// Constants
const scoreText = document.querySelector("#scoreText");
const questions = document.querySelectorAll(".q-container");

// Check answer function
function checkAnswer(question, result) {
  let answer = document.querySelector(`input[name="${question}"]:checked`);
  let qResult = document.querySelector(result);

  qResult.style.display = "block";

  if (answer) {
    document.querySelector("#" + question).disabled = true;
    if (answer.value === "correct") {
      qResult.innerText = "Correct";
      score += 1;
      scoreText.innerText = `Score: ${score}`;
      nextQ();
    } else {
      qResult.innerText = "Incorrect";
      nextQ();
    }
  } else {
    qResult.innerText = "Please select an answer";
  }
}

// Display first question
questions[0].style.display = "block";

// Next question function
function nextQ() {
  if (currentQ < questions.length - 1) {
    questions[currentQ].style.display = "none";
    currentQ++;
    questions[currentQ].style.display = "block";
  }
}
