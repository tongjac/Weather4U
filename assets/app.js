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
      } else {
        // do this if there is a valid response.
        // push to search history list
        console.log(data.city.name);
        searchHistory(data.city.name);
      }
    })
    // If API is down, take care of error and do not let app hang.
    .catch((err) => {
      throw err;
    });
}

function searchHistory(textInput) {
  let line = document.createElement("li");
  let text = textInput;
  line.textContent = text;
  let historyEl = document.getElementById("search-history");
  historyEl.onclick = (event) => {
    event.preventDefault();
    if (event.target.tagName == "LI") {
      searchWeather(event.target.textContent);
    }
  };
  historyEl.appendChild(line);
  let setClass = document.createAttribute("class");
  setClass.value = "list-group-item";
  line.setAttributeNode(setClass);
  let setVal = document.createAttribute("value");
  setVal.value = textInput;
  line.setAttributeNode(setVal);

  // document
  //   .getElementsByClassName("list-group-item")
  //   .addEventListener("click", function (e) {
  //     e.preventDefault();
  //     forecastGet(target.value);
  //   });
}
