let systemSequence = [];
let userSequence = [];

let currentScore = 0;
let currentLevel = 0;

let isGameStart = false;

let randomNumber;

let score = document.getElementById("score-value");
let level = document.getElementById("level-value");
let allBtns = document.querySelectorAll(".simon-btn");

function glowButton(btn, id) {
  btn.classList.add("glow-white");

  document.querySelectorAll(".simon-btn").forEach((btn) => {
    if (btn.id !== `${id}`) {
      btn.style.pointerEvents = "none";
    }
  });

  setTimeout(() => {
    btn.classList.remove("glow-white");
    document.querySelectorAll(".simon-btn").forEach((btn) => {
      btn.style.pointerEvents = "auto";
    });
  }, 600);
}

function startGame() {
  startBtn.style.display = "none";
  isGameStart = true;
}

let startBtn = document.querySelector(".engage-btn");
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  if (isGameStart == false) {
    isGameStart = true;
    showToast(" Game Start", "info");
    setTimeout(levelUp, 500);
    systemSequence.length = 0;
    userSequence.length = 0;
    currentLevel = 0;
    currentScore = 0;
    score.textContent = currentScore;
    level.textContent = currentLevel;
  }
});

function nextLevel() {
  let randomId = Math.floor(Math.random() * 4) + 1;
  let randomBtn = document.getElementById(`${randomId}`);

  systemSequence.push(randomId);

  glowButton(randomBtn, randomId);
}

for (let btn of allBtns) {
  btn.addEventListener("click", userInput);
}

function userInput() {
  let btnId = Number(this.id);
  console.log(btnId);
  userSequence.push(btnId);

  chaeck(userSequence.length - 1);
}

function levelUp() {
  userSequence.length = 0;
  nextLevel();
}

function chaeck(idx) {
  if (userSequence[idx] == systemSequence[idx]) {
    if (userSequence.length == systemSequence.length) {
      currentLevel = currentLevel + 1;
      currentScore = currentScore + 5;
      score.textContent = currentScore;
      level.textContent = currentLevel;

      console.log(userSequence);
      console.log(systemSequence);

      setTimeout(levelUp, 1000);
    }
  } else {
    resetGame();
  }
}

function resetGame() {
  showToast(" Game over", "error");
  isGameStart = false;
  startBtn.innerHTML = `Reset Game`;
  startBtn.style.display = "block";
}
