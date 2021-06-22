//Server side JS code

/*
* ALL REQUIRED PACKAGES
*/
//web framework - express
const express = require('express');
//Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
//Body parser to parse JSON
const bodyParser = require('body-parser');

// Start and instance of the app
const app = express();


/*
* MIDDLEWARE -
* 	bodyparser
*	Parse incoming request bodies in a middleware before your
*	handlers, available under the req.body property.
*
*	bodyParser.json() - Returns middleware that only parses json and
*	only looks at requests where the Content-Type header matches the
*	type option.
*
*	bodyParser.urlencoded({ extended: false }) - Returns middleware
*	that only parses urlencoded bodies and only looks at requests
*	where the Content-Type header matches the type option.
*	The extended option allows to choose between parsing the
*	URL-encoded data with the querystring library (when false) or the
*	qs library (when true).
*
*	Configure express to use body-parser as middle-ware
*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// User cors for cross origin allowance. Use cors middleware
app.use(cors());


/*
* SERVER SET-UP
*/
// Set a port to run the server on
const port = 3000;

// Serve static files from website folder and connect them with the server
app.use(express.static('website'));

/*
* GLOBAL VARIABLES
*/
// Project Data
const projectData = {
};

let data = {};

/*GET METHOD
These routing methods specify a callback function (sometimes called
“handler functions”) called when the application receives a request
to the specified route (endpoint) and HTTP method. In other words,
the application “listens” for requests that match the specified
route(s) and method(s), and when it detects a match, it calls the
specified callback function.
* @description: gets index file
* @param req: request with details of method and information about data requested
* @param res: response sent with details of status and data
*
*/
app.get('/', (req, res) => {
	console.log("Get request");
	// console.log(JSON.stringfy(projectData));
	res.send(projectData);
});

/*
* @description: gets requested data for getData route
* @param req: request with details of method and information about data requested
* @param res: response sent with details of status and data
*/
// Get request for getData route
const getData = (req, res) => {
	console.log("Get data get request");
	console.log(projectData);
	res.send(projectData);
}

// GET Request for /getData route
app.get('/getData', getData);


/*POST METHOD
* @description: Post data from user to server for addRating route
* @param req: request with details of method and information about data requested
* @param res: response sent with details of status and projectData
*/
app.post('/addRating', (req, res) => {
	data.cityName = req.body.cityName;
	data.currTemp = req.body.currTemp;
	data.currTempFeelsLike = req.body.currTempFeelsLike;
	data.maxTemp = req.body.maxTemp;
	data.minTemp = req.body.minTemp;
	data.description = req.body.description;
	data.currDate = req.body.currDate;
	data.feelings = req.body.feelings;
	projectData.latestRecord = data;
	console.log(data);
	res.send(projectData);
});

// Keep the server running and listen for activity
app.listen(port, ()=>{
	console.log(`Server running on port: ${port}`);
});