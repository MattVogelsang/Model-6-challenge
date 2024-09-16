const apiKey = '61ef5f629fcb20d18f360f364c92c24c' 


const searchForm = document.querySelector('form');
const cityInput = document.querySelector('input[type="text"]');
const weatherContainer = document.querySelector('.col-9');
const cityButtons = document.querySelectorAll('.btn.bg-secondary');


searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    getWeatherData(city);
  } else {
    alert('Please enter a city name');
  }
});

cityButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const city = button.textContent;
    getWeatherData(city);
  });
});


function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
console.log("getWeatherData");
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Error fetching the weather data:', error);
    });
}


function displayWeatherData(data) {
  weatherContainer.innerHTML = ''; // Clear previous content

  const cityHeader = document.createElement('h2');
  cityHeader.textContent = `Weather in ${data.city.name}`;
  console.log(data.city.name)
  weatherContainer.appendChild(cityHeader);

  const forecast = data.list.filter((item) => item.dt_txt.includes('12:00:00'));

  forecast.forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    const temp = item.main.temp;
    const weatherIcon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
    const description = item.weather[0].description;

    const weatherDay = document.createElement('div');
    weatherDay.classList.add('weather-day', 'col-md-3', 'p-3', 'm-2', 'bg-light', 'border', 'rounded');
    weatherDay.innerHTML = `
      <h4>${date}</h4>
      <img src="${weatherIcon}" alt="${description}">
      <p><strong>${temp}°C</strong></p>
      <p>${description}</p>
    `;
    weatherContainer.appendChild(weatherDay);
  });
}
