let weatherArray = [];

// let cityInput = document.getElementById("search-form").value;

let weatherCall =
  "api.openweathermap.org/data/2.5/weather?q=London&appid=" + "apiKey";

function trigger() {
  fetch(weatherUrl)
    .then((response) => {
      return response.json();
    })
    .then((requestData) => {
      if (cityInputVal !== requestData.name) {
        alert("It's not a city. Please enter the name of the city."); // alerts the user they entered an unknown city
        return;
      }
    });
}

document
  .getElementById("submit-button")
  .addEventListener("click", function (e) {
    e.preventDefault;
    console.log(document.getElementById("search-form").value);
  });
