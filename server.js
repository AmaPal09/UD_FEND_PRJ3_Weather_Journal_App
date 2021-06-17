//Server side JS code
/*All required packages*/

//web framework - express
const express = require('express');
//Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
const bodyParser = require('body-parser');

// Start and instance of the app
const app = express();

/*Middleware
	Configure express to use body-parser as middle-ware

*/
/* Middleware - bodyparser
	Parse incoming request bodies in a middleware before your
	handlers, available under the req.body property.

	bodyParser.json() - Returns middleware that only parses json and
	only looks at requests where the Content-Type header matches the
	type option.

	bodyParser.urlencoded({ extended: false }) - Returns middleware
	that only parses urlencoded bodies and only looks at requests
	where the Content-Type header matches the type option.
	The extended option allows to choose between parsing the
	URL-encoded data with the querystring library (when false) or the
	qs library (when true).
*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// User cors for cross origin allowance. Use cors middleware
app.use(cors());

// Set a port to run the server on
const port = 3000;

// Serve static files from website folder and connect them with the server
app.use(express.static('website'));

// Project Data
const projectData = {
	l1: 'html1',
	l2: 'css',
	l3: 'js'
};

let data = [];

/*GET Method
These routing methods specify a callback function (sometimes called
“handler functions”) called when the application receives a request
to the specified route (endpoint) and HTTP method. In other words,
the application “listens” for requests that match the specified
route(s) and method(s), and when it detects a match, it calls the
specified callback function.
*/
app.get('/', (req, res) => {
	console.log("Get request");
	// console.log(JSON.stringfy(projectData));
	res.send(projectData);
});

// Get request for getData route
const getData = (req, res) => {
	console.log("Get data get request");
	console.log(projectData);
	res.send(projectData);
}

app.get('/getData', getData);


/*POST METHOD
Post data from user to server
*/
app.post('/addRating', (req, res) => {
	console.log("post request");
	data.push(req.body);
	console.log(data);
	// console.log(res);
	// res.send(`Recevied ${data[data.length-1]} from user`);
	// res.send("Recevied");
});

// Keep the server running and listen for activity
app.listen(port, ()=>{
	console.log(`Server running on port: ${port}`);
});