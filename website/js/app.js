/*
* GLOBAL VARS
*/
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const WEATHER_API_KEY = '&appid=3da249315989972b747443d739018cd3&units=imperial';

//VARS FOR USER INPUT
const zip = document.getElementById('zip');
const feelings = document.getElementById('feeling');
const generateBtn = document.getElementById('generate');
// const errorBoard = document.getElementById('error__msg');
const errorBoard = document.querySelector('.error__box');
const errorMsg = document.getElementById('error__msg');
const logBoard = document.querySelector('.weather__log');


/*
*	M A I N   F U N C T I O N S
*/


/*
* postData ASYNC FUNCTION
* @description: Makes a post request to the server to
* 				post data.
* @param {string} url: url to post to,
* @param  {object} data: data that is to be posted
* @returns {json} response: response from the server
*/
const postData = async (url = '', data = {}) => {
	if (Object.keys(data).length == 0) {
		console.log("undefined data");
	}
	else {
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
			console.log(newData);
		    return newData;
		}catch(error) {
			console.log("error", error);
		}
	}
}


/*
* getWeatherData ASYNC FUNCTION
* @description: Obtains weather data from Open Weather Maps by making
* 				a get request for given zip code to open weather maps url
* @returns {json} response: Weather data from Open Weather Maps
*/
const getWeatherData = async () => {
	const url = BASE_WEATHER_URL+ zip.value + WEATHER_API_KEY;
	const presentData = new Date();
	console.log(url);

	const response = await fetch(url);
	try {
		console.log("Processing fetch response");
		const weatherData = await response.json();
		if (weatherData.cod == '404' || weatherData.cod == '400') {
			displayErrorMsg("Please enter valid US zip code. \nFor other countries, enter zipcode, country code eg: 411021,IN");
		}
		else {
			console.log(weatherData);
			const newData = {};
			newData.cityName = weatherData.name;
			newData.currTemp = weatherData.main.temp;
			newData.currTempFeelsLike = weatherData.main.feels_like;
			newData.maxTemp = weatherData.main.temp_max;
			newData.minTemp = weatherData.main.temp_min;
			newData.description = weatherData.weather[0].description;
			newData.currDate = presentData.toDateString();
			newData.feelings = feelings.value;
			return newData;
		}
	}
	catch(error) {
		console.log("error", error);
	}
}


/*
* getRecentData ASYNC FUNCTION
* @description: Obtain recent weather data entry from the server by
* 				making a get request to the server
* @returns {json} response: response from the server
*/
const getRecentData = async () => {
	const response = await fetch('/getData');
	try {
		console.log("Processing getData");
		const recentEntry = await response.json();
		console.log(recentEntry.latestRecord);
		return recentEntry;
	}
	catch(error) {
		console.log("error", error);
	}
}


/*
* displayToUser ASYNC FUNCTION
* @description: Display recent weather data from server on the UI
* 				to the user
* @param  {object} data: Recent entry object from the server
*/
const displayToUser = async (recentEntry) => {
	console.log("In displayToUser");
	console.log(recentEntry);
	if (Object.keys(recentEntry).length !== 0) {
		document.getElementById('logDate').innerText = `On ${recentEntry.latestRecord.currDate},`;
		document.getElementById('logCityName').innerText = `in the city of ` +
														`${recentEntry.latestRecord.cityName};`;
		document.getElementById('logWeatherDescription').innerText = `when the weater was ` +
														`${recentEntry.latestRecord.description},`;
		document.getElementById('logCurrTemp').innerText = `& the temperature was ` +
														`${recentEntry.latestRecord.currTemp}°F,`;
		document.getElementById('logFeeling').innerText = `I was feeling ` +
														`${recentEntry.latestRecord.feelings}!`

		logBoard.classList.remove('hide'); //Display weather log
		errorBoard.classList.add('hide'); //Hide error message
	}
}


/*
* printWeatherData ASYNC FUNCTION
* @description: Calls to gets weather data from open weather maps
* 				Calls to posting obtained weather data to server
*				Calls to get the recent weather data entry from the server
*				Calls to display recent entry on the UI
*/
const printWeatherData = async () => {
	getWeatherData()
	.then((data) => {
		console.log(data);
		postData('/addRating', data);
	})
	.then( () => getRecentData() )
	.then((recentEntry) => displayToUser(recentEntry));
}


/*
* submitForm FUNCTION
* @description: Prevents default submit of the generate button
*				Calls printweatherdata funtion
*/
function submitForm(e) {
	e.preventDefault();
	//Validate if user input is blank
	if (zip.value == "" || feelings.value == "") {
		if (zip.value == "" && feelings.value == "") {
			displayErrorMsg("Please enter zip code and feelings");
		}
		else if (zip.value == "") {
			displayErrorMsg("Please enter zip code");
		}
		else if (feelings.value == "") {
			displayErrorMsg("Please enter feelings");
		}
	}
	//Execute for valid user input
	else {
		printWeatherData();
	}
}

function displayErrorMsg(msg) {
	errorMsg.innerText = msg;
	errorBoard.classList.remove('hide'); //Display Error Message
	logBoard.classList.add('hide'); //Hide weather log
}

/*
* EVENT LISTENERS
*/
generateBtn.addEventListener('click', submitForm);