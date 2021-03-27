let weatherArray = [];
let cityInput = "";
let apiKey = "c1652b344dd0c23882d04fcb84c0b87a";
let array = [];

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
      array = response.json();
      console.log(array);
      console.log(this.main.feels_like);
      console.log(this.clouds);
      console.log(this.timezone);
      return;
    })
    .catch((err) => {
      console.log(err);
    });
}
