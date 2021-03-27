let cityInput = "";

// Makes Clicking the Search button do something
document
  .getElementById("submit-button")
  .addEventListener("click", function (e) {
    e.preventDefault;
    cityInput = document.getElementById("search-form").value;
    // If you enter a blank value, it'll ask you to search for a city.
    if (cityInput === "") {
      alert("Please enter a location.");
    } else {
      forecastGet(cityInput);
    }
  });

function forecastGet(city) {
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=c1652b344dd0c23882d04fcb84c0b87a&units=imperial"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.message === "city not found") {
        // Push to main segment that city is not found.
        alert("This isn't a valid location. Please search again.");
      } else {
        // do this if there is a valid response.
        postWeather(data);
        // push to search history list.
        searchHistory(data.city.name);
      }
    })
    // If API is down, take care of error and do not let app hang.
    .catch((err) => {
      throw err;
    });
}

function searchHistory(textInput) {
  // If List gets too long, remove the last item.
  let historyList = document.getElementsByClassName("list-group-item");
  if (historyList.length > 8) {
    var last = historyList[historyList.length - 1];
    last.parentNode.removeChild(last);
  }
  // Create a list item, add it to the top of list, and let them be clickable.
  let line = document.createElement("li");
  line.textContent = textInput;
  let setClass = document.createAttribute("class");
  setClass.value = "list-group-item";
  line.setAttributeNode(setClass);
  let historyEl = document.getElementById("search-history");
  historyEl.onclick = (event) => {
    event.preventDefault();
    if (event.target.tagName == "LI") {
      forecastGet(event.target.textContent);
    }
  };
  historyEl.prepend(line);
}

function postWeather(weatherInput) {
  var forecastEl = document.querySelector("#forecast");
  forecastEl.innerHTML = '<h4 class="mt-3">5-Day Forecast:</h4>';
  forecastRowEl = document.createElement("div");
  forecastRowEl.className = '"row"';

  // loop over all forecasts (by 3-hour increments)
  for (var i = 0; i < weatherInput.list.length; i++) {
    // only look at forecasts around 3:00pm
    if (weatherInput.list[i].dt_txt.indexOf("15:00:00") !== -1) {
      // create html elements for a bootstrap card
      // var colEl = document.createElement("div");
      // colEl.classList.add("col-md-2");
      var cardEl = document.createElement("div");
      cardEl.classList.add("card", "bg-primary", "text-white");
      var windEl = document.createElement("p");
      windEl.classList.add("card-text");
      windEl.textContent =
        "Wind Speed: " + weatherInput.list[i].wind.speed + " MPH";
      var humidityEl = document.createElement("p");
      humidityEl.classList.add("card-text");
      humidityEl.textContent =
        "Humidity : " + weatherInput.list[i].main.humidity + " %";
      var bodyEl = document.createElement("div");
      bodyEl.classList.add("card-body", "p-2");
      var titleEl = document.createElement("h5");
      titleEl.classList.add("card-title");
      titleEl.textContent = new Date(
        weatherInput.list[i].dt_txt
      ).toLocaleDateString();
      var imgEl = document.createElement("img");
      imgEl.setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          weatherInput.list[i].weather[0].icon +
          ".png"
      );
      var p1El = document.createElement("p");
      p1El.classList.add("card-text");
      p1El.textContent = "Temp: " + weatherInput.list[i].main.temp_max + " °F";
      var p2El = document.createElement("p");
      p2El.classList.add("card-text");
      p2El.textContent =
        "Humidity: " + weatherInput.list[i].main.humidity + "%";

      // merge together and put on page
      // colEl.appendChild(cardEl);
      bodyEl.appendChild(titleEl);
      bodyEl.appendChild(imgEl);
      bodyEl.appendChild(windEl);
      bodyEl.appendChild(humidityEl);
      bodyEl.appendChild(p1El);
      bodyEl.appendChild(p2El);
      cardEl.appendChild(bodyEl);
      forecastEl.appendChild(cardEl);
    }
  }
}
