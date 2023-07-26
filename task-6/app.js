const api = {
  key: "b8e3d59c127f43cdaea113815232507",
  base: "https://api.weatherapi.com/v1/",
};

const header = document.querySelector(".header");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const today = document.querySelector(".today");

function showCard({ name, country, temp, condition, icon }) {
  const html = `<div class="card">
                    <h2 class="card-city">${name} <span>${country}</span></h2>

                    <div class="card-weather">
                        <div class="card-value">${temp}<sup>°c</sup></div>
                        <img class="card-img" src="${icon}" alt="Weather">
                    </div>

                        <div class="card-description">${condition}</div>
                </div>`;

  header.insertAdjacentHTML("afterend", html);
}

async function getWeather(city) {
  const url = `${api.base}current.json?key=${api.key}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

form.onsubmit = async function (e) {
  e.preventDefault();
  removeCard();

  let city = input.value.trim();

  const data = await getWeather(city);

  if (data?.error?.code === 1003) {
    removeCard();
    showError("Please fill in the field");
  } else if (data.error) {
    showError("No matching location found");
  } else {
    removeCard();

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
    };

    showCard(weatherData);
  }
};

function removeCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`;

  header.insertAdjacentHTML("afterend", html);
}

const day = new Date().toLocaleString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
today.insertAdjacentHTML("afterbegin", day);
