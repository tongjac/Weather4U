let weatherArray = [];
let cityInput = "";
let apiKey = "c1652b344dd0c23882d04fcb84c0b87a";

document
  .getElementById("submit-button")
  .addEventListener("click", function (e) {
    e.preventDefault;
    cityInput = document.getElementById("search-form").value;
    trigger(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        cityInput +
        "&appid=" +
        apiKey
    );
  });

function trigger(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.main.feels_like);
    })
    .catch((err) => {
      throw err;
    });
}

function searchHistory(textInput) {
  let line = document.createElement("li");
  let text = textInput;
  line.textContent = text;
  let historyEl = document.getElementById("search-history");
  historyEl.onclick = function (event) {
    console.log(event.target.tagName);
    if (event.target.tagName == "LI") {
      searchWeather(event.target.textContent);
    }
  };
  historyEl.appendChild(line);
}
