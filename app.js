// Prevent animation on load

setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM element

const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: ["rock", "spock"],
  },
  {
    name: "scissors",
    beats: ["paper", "lizard"],
  },
  {
    name: "rock",
    beats: ["scissors", "lizard"],
  },
  {
    name: "lizard",
    beats: ["spock", "paper"],
  },
  {
    name: "spock",
    beats: ["scissors", "rock"],
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultstDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results-result");

const resultWinner = document.querySelector(".results-winner");
const resultText = document.querySelector(".results-text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score-number");
let score = 0;

// Show/hide modal

btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

// Game logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    // console.log(choice);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, index) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
      <div class="choice ${results[index].name}">
        <img src="./images/icon-${results[index].name}.svg" alt="${results[index].name}"/>
      </div>`;
    }, index * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultstDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerHTML = "you win";
      resultDivs[0].classList.toggle("winner");
      keepScore(1);
    } else if (aiWins) {
      resultText.innerHTML = "you lose";
      resultDivs[1].classList.toggle("winner");
      keepScore(-1);
    } else {
      resultText.innerHTML = "draw";
    }
    resultWinner.classList.toggle("hidden");
    resultstDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  if (results[0].beats[0] === results[1].name) {
    return results[0].beats[0] === results[1].name;
  } else {
    return results[0].beats[1] === results[1].name;
  }
}

// playagain button
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultstDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = " ";
    resultDiv.classList.remove("winner");
  });

  resultText.innerHTML = "";
  resultWinner.classList.toggle("hidden");
  resultstDiv.classList.toggle("show-winner");
});

// Adding score
function keepScore(point) {
  score += point;
  if (score < 0) {
    score = 0;
    scoreNumber.innerText = score;
  } else {
    scoreNumber.innerText = score;
  }
}
