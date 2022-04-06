// API URLs and key
const apiZipURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiCityURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=257b08b0fd9786cf5fa67b5d716da8f4&units=metric';

const icon = document.querySelector('#icon');
const date = document.querySelector('#date');
const city = document.querySelector('#city');
const temp = document.querySelector('#temp');
const desc = document.querySelector('#desc');
const content = document.querySelector('#content');
const generate = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// Event Listener
generate.addEventListener('click', () => {
  // assign the values the user has entered to variables
  const newZip = document.querySelector('#zip').value;
  const newCity = document.querySelector('#cityName').value;
  const feelings = document.querySelector('#feelings').value;

  // if the user enter a zip code we use it first, if not we can use city name
  if (newZip != 0) {
    // use zip code to execute
    getWeatherByZipCode(apiZipURL, newZip, apiKey).then((data) => {
      // show the error message back form api to the user
      if (data.cod != 200) {
        return alert(data.message);
      }

      // add the new data to the post route
      postData('/add', {
        icon: data.weather[0].icon,
        date: newDate,
        city: data.name,
        temp: data.main.temp,
        desc: data.weather[0].description,
        content: feelings,
      });
      return data;
    });
  } else {
    // use city name to execute
    getWeatherByCityName(apiCityURL, newCity, apiKey).then((data) => {
      // show the error message back form api to the user
      if (data.cod != 200) return alert(data.message);

      // add the new data to the post route
      postData('/add', {
        icon: data.weather[0].icon,
        date: newDate,
        city: data.name,
        temp: data.main.temp,
        desc: data.weather[0].description,
        content: feelings,
      });
    });
  }
});

// Async Get request to api by zip code
const getWeatherByZipCode = async (apiZipURL, zip, apiKey) => {
  const response = await fetch(apiZipURL + zip + apiKey);
  try {
    // transorm data to json
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error');
  }
};

// Async Get request to api by city name
const getWeatherByCityName = async (apiCityURL, cityName, apiKey) => {
  const response = await fetch(apiCityURL + cityName + apiKey);
  try {
    // transorm data to json
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// Async Post request
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // transform the data to strings
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();

    // print the data to confirm a successful operation
    console.log('Data posted successfully\n', newData);

    // push the data to the user interface
    updateUI();

    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// updates the UI dynamically
const updateUI = async (url = '') => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    // print the data to confirm a successful operation
    console.log(`successfully updateUI ${allData}`);

    // assign icon url to a variable
    const iconURL = `http://openweathermap.org/img/wn/${allData.icon}@2x.png`;

    // assign the new data to html elements
    icon.innerHTML = `<img src='${iconURL}'>`;
    date.innerHTML = `Date: ${allData.date}`;
    city.innerHTML = `City: ${allData.city}`;
    temp.innerHTML = `Temperature: ${allData.temp} c`;
    desc.innerHTML = `Description: ${allData.desc}`;
    content.innerHTML = `Feels like its ${allData.content}`;
  } catch (error) {
    console.log('error', error);
  }
};

// show only result and hide input section
generate.addEventListener('click', function hide() {
  document.querySelector('#zipDiv').remove();
  document.querySelector('#cityDiv').remove();
  document.querySelector('#feelingDiv').remove();
  document.querySelector('#backBtn').style.visibility = 'visible';
});
