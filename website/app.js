//Global variables
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=94041';
const WEATHER_API_KEY = '&appid=3da249315989972b747443d739018cd3';

/*
* VARS FOR USER INPUT
*
*/
const zip = document.getElementById('zip');
const feelings = document.getElementById('feeling');
const generateBtn = document.getElementById('log');

const postData = async (url = '', data = {}) => {
	console.log(data);
	const response = await fetch( url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
          'Content-Type': 'application/json',
		},
		// Body data type must match "Content-Type" header
		body: JSON.stringify(data),
	});

	try {
		console.log("Processing response");
		const newData = await response.json();
		// console.log("Got response");
		console.log(newData);
	    return newData;
	}catch(error) {
		console.log("error", error);
	}
}


const getWeatherData = async () => {
	const url = BASE_WEATHER_URL + WEATHER_API_KEY;
	const presentData = new Date();
	console.log(url);

	const response = await fetch(url);
	try {
		console.log("Processing fetch response");
		const weatherData = await response.json();
		console.log(weatherData);
		const newData = {};
		newData.cityName = weatherData.name;
		newData.currTemp = weatherData.main.temp;
		newData.currTempFeelsLike = weatherData.main.feels_like;
		newData.maxTemp = weatherData.main.temp_max;
		newData.minTemp = weatherData.main.temp_min;
		newData.description = weatherData.weather[0].description;
		newData.currDate = presentData.toDateString();
		return newData;
	}
	catch(error) {
		console.log("error", error);
	}
}

const printWeatherData = async () => {
	getWeatherData()
	.then((data) => {
		console.log(data);
		postData('/addRating', data);
	});
}

printWeatherData();