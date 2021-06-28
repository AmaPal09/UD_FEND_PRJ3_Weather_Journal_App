//Global variables
// const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=94041';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const WEATHER_API_KEY = '&appid=3da249315989972b747443d739018cd3&units=imperial';
/*
* VARS FOR USER INPUT
*
*/
const zip = document.getElementById('zip');
const feelings = document.getElementById('feeling');
const generateBtn = document.getElementById('generate');
const errorBoard = document.getElementById('error__msg');
const logBoard = document.querySelector('.weather__log');


/*
* POSTDATA async function
* @description: Makes a post request to the server to
* 				post data.
* @param {string} url: url to post to,
* @param  {object} data: data that is to be posted
* @return {json} response: response from the server
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
			// console.log("Got response");
			console.log(newData);
		    return newData;
		}catch(error) {
			console.log("error", error);
		}
	}
}


/*
* GETWEATHERDATA async function
* @description: Obtains weather data from Open Weather Maps by making
* 				a get request for given zip code to open weather maps url
* @return {json} response: Weather data from Open Weather Maps
*/
const getWeatherData = async () => {
	// const url = BASE_WEATHER_URL + WEATHER_API_KEY;
// TODO: Remove hardcoded value for zip & feelings
	// zip.value = '94041';
	// feelings.value = 'Great!'
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
* GETRECENTDATA async function
* @description: Obtain recent weather data entry from the server by
* 				making a get request to the server
* @return {json} response: response from the server
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
* DISPLAYTOUSER async function
* @description: Display recent weather data from server on the UI
* 				to the user
* @param  {object} data: Recent entry object from the server
*/
//Display to the user
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
* PRINTWEATHERDATA async function
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
* SUBMITFORM function
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
	errorBoard.innerText = msg;
	errorBoard.classList.remove('hide'); //Error Message visible
	logBoard.classList.add('hide'); //Weather card hidden
}

/*
* EVENT LISTENERS
*/
generateBtn.addEventListener('click', submitForm);