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
        let summaryEl = document.getElementById("forecast-summary");
        summaryEl.innerHTML = `<div class="card">
        <div class="card-header">Invalid location. Please try again.</div>`;
        let forecastEl = document.getElementById("forecast-full");
        forecastEl.innerHTML = "<p></p>";
      } else {
        // Do these functions if there is a valid response.
        // But first let's clear out the previous summary  in case.
        let summaryEl = document.getElementById("forecast-summary");
        summaryEl.innerHTML = "";
        let forecastEl = document.getElementById("forecast-full");
        forecastEl.innerHTML = "<p></p>";
        // Prints summary elements.
        dailyWeather(data);
        // Push to search history list.
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

function dailyWeather(data) {
  let summaryEl = document.getElementById("forecast-summary");
  let titleEl = document.createElement("h3");
  titleEl.classList.add("card-title");
  titleEl.textContent =
    data.city.name + " (" + new Date().toLocaleDateString() + ")";
  let cardEl = document.createElement("div");
  cardEl.classList.add("card");
  let windEl = document.createElement("p");
  windEl.classList.add("card-text");
  let humidEl = document.createElement("p");
  humidEl.classList.add("card-text");
  let tempEl = document.createElement("p");
  tempEl.classList.add("card-text");
  humidEl.textContent = "Humidity: " + data.list[0].main.humidity + " %";
  tempEl.textContent = "Temperature: " + data.list[0].main.temp + " °F";
  windEl.textContent = "Wind Speed: " + data.list[0].wind.speed + " MPH";
  let cardBodyEl = document.createElement("div");
  cardBodyEl.classList.add("card-body");
  let imgEl = document.createElement("img");
  imgEl.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png"
  );

  titleEl.appendChild(imgEl);
  cardBodyEl.appendChild(titleEl);
  cardBodyEl.appendChild(tempEl);
  cardBodyEl.appendChild(humidEl);
  cardBodyEl.appendChild(windEl);
  cardEl.appendChild(cardBodyEl);
  // The one UV Index side
  UVindex(data);
  summaryEl.appendChild(cardEl);

  // Prints 5 weather forecast cards.
  postWeather(data);
}

function postWeather(weatherInput) {
  let forecastEl = document.getElementById("forecast-full");
  forecastRowEl = document.createElement("div");
  forecastRowEl.className = '"row"';

  // loop over all forecasts (by 3-hour increments)
  for (let i = 0; i < weatherInput.list.length; i++) {
    // only look at forecasts around 3:00pm
    if (weatherInput.list[i].dt_txt.indexOf("15:00:00") !== -1) {
      // create html elements for a bootstrap card
      var colEl = document.createElement("div");
      colEl.classList.add("col-md-2");
      let cardEl = document.createElement("div");
      cardEl.classList.add("card", "bg-primary", "text-white");
      let windEl = document.createElement("p");
      windEl.classList.add("card-text");
      windEl.textContent =
        "Wind Speed: " + weatherInput.list[i].wind.speed + " MPH";
      let humidityEl = document.createElement("p");
      humidityEl.classList.add("card-text");
      humidityEl.textContent =
        "Humidity : " + weatherInput.list[i].main.humidity + " %";
      let bodyEl = document.createElement("div");
      bodyEl.classList.add("card-body", "p-2");
      let titleEl = document.createElement("h5");
      titleEl.classList.add("card-title");
      titleEl.textContent = new Date(
        weatherInput.list[i].dt_txt
      ).toLocaleDateString();
      let imgEl = document.createElement("img");
      imgEl.setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          weatherInput.list[i].weather[0].icon +
          ".png"
      );
      let p1El = document.createElement("p");
      p1El.classList.add("card-text");
      p1El.textContent = "Temp: " + weatherInput.list[i].main.temp_max + " °F";
      let p2El = document.createElement("p");
      p2El.classList.add("card-text");
      p2El.textContent =
        "Humidity: " + weatherInput.list[i].main.humidity + "%";

      // merge together and put on page
      colEl.appendChild(cardEl);
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

function UVindex(data) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      data.city.coord.lat +
      "&lon=" +
      data.city.coord.lon +
      "&exclude=minute,hourly,daily,alerts&appid=c1652b344dd0c23882d04fcb84c0b87a"
  )
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      console.log(res);
      res.current.uvi;
    })
    .catch((err) => {
      throw err;
    });
}
