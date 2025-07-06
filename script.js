let cityInput = document.getElementById("cityInput");
let form = document.querySelector("form");
let display = document.getElementById("display");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (cityInput.value.trim() == "") {
    console.error("Invalid input, try again!");
    return;
  }
  let apiKey = "434dedc17ba6e534a1cf3a5a5c14308c";
  let city = cityInput.value.trim();
  let response;
  try {
    let incomingData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    console.log(incomingData);

    response = await incomingData.json();
    console.log(response);

    let temp = response.main.temp;
    let humidity = response.main.humidity;
    let wind = response.wind.speed;
    let cityDisplay = response.name;
    let icon = response.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    display.innerHTML = `<div id="tempAndCity">
            <img src=${iconUrl} alt="" />
            <div id="mainData">
              <h1>${temp}</h1>
              <h3>${cityDisplay}</h3>
            </div>
          </div>
          <div id="others">
            <div id="humidity">
              <h3>Humidity</h3>
              <p>${humidity}</p>
            </div>
            <div id="wind">
              <h3>Wind</h3>
              <p>${wind} km/h</p>
            </div>
          </div>`;
  } catch (error) {
    display.innerHTML = `<h1 style="color: red">${response.message}</h1>`;
    // OR
    // console.error(`${response.cod}: ${response.message}`);
    // OR
    // console.error("Error fetching data:", error);
  }
});
