const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "#bd0b17",
  "#46aef7",
  "#fce24e",
  "#09d733",
  "#e634d1",
  "#164bfa",
  "#fa6d16",
];
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = Number(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  //   timeEl.parentNode.classList.add("hide");
  timeEl.parentNode.remove();
  board.innerHTML = `<h1>score: <span class='primary'>${score}</span></h1>
  <a href="" class="start">new game</a>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getrRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getrRandomNumber(0, width - size);
  const y = getrRandomNumber(0, height - size);
  const color = getRandomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = color;
  board.append(circle);
}

function getrRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// function winTheGame() {
//     function kill() {
//         const circle = document.querySelector('.circle')
//         if (circle) {
//             circle.click()
//         }
//     }
//     setInterval(kill,42)
// }
