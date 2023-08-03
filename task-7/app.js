const today = document.querySelector(".today");
const day = new Date().toLocaleString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

today.insertAdjacentHTML("afterbegin", day);

const section = document.querySelector("body"),
  icons = document.querySelector(".icons");
icons.onclick = () => {
  section.classList.toggle("dark");
};

function clock() {
  const hoursArrow = document.querySelector(".hours");
  const minutesArrow = document.querySelector(".minutes");
  const secondsArrow = document.querySelector(".seconds");

  const degg = 6; //  360 / 60 = 6

  setInterval(() => {
    const day = new Date();

    const hours = day.getHours() * 30;
    const minutes = day.getMinutes() * degg;
    const seconds = day.getSeconds() * degg;

    hoursArrow.style.transform = `rotate(${hours + minutes / 12}deg)`;
    minutesArrow.style.transform = `rotate(${minutes}deg)`;
    secondsArrow.style.transform = `rotate(${seconds}deg)`;
  }, 0);
}
clock();

const currentTime = document.querySelector("h1"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector("button");

let alarmTime,
  isAlarmSet,
  ringtone = new Audio("./audio/alarm.mp3");
for (let i = 23; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  const date = new Date();
  hours = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  currentTime.innerText = `${hours}:${minutes}:${seconds} `;
  if (alarmTime === `${hours}:${minutes} `) {
    ringtone.play();
    ringtone.loop = true;
  }
});

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (
      (selectMenu[0].value = "Hour"),
      (selectMenu[1].value = "Minute"),
      (isAlarmSet = false)
    );
  }
  let time = `${selectMenu[0].value}:${selectMenu[1].value} `;

  if (time.includes("Hour") || time.includes("Minute")) {
    return alert("Please, select a valid time to set Alarm!");
  }
  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}
setAlarmBtn.addEventListener("click", setAlarm);

// const time = document.querySelector(".time");
// function setTime() {
//   const timeInfo = new Date();
//   time.textContent = timeInfo.toLocaleTimeString();
// }
// setInterval(setTime, 1000);
