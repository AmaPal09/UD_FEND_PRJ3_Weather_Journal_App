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


// POST request sent to the server
postData('/addRating', {temparature: 22, date: '10/10/2021',
						userResponse: 'happy'});

const getWeatherData = async () => {
	const url =
	'api.openweathermap.org/data/2.5/weather?zip=94041&appid=3da249315989972b747443d739018cd3';

	const response = await fetch(url);
	try {
		console.log("Processing fetch response");
		console.log(response);
		const weatherData = await response.json();
		// const weatherData = await JSON.parse(response);
		// const weatherData = await res.text();
		console.log(weatherData);
		return weatherData;
	}
	catch(error) {
		console.log("error", error);
	}
}

getWeatherData();