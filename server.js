//Server side JS code
/*All required packages*/

//web framework - express
const express = require('express');
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

// User cors for cross origin allowance
app.use(cors());

// Set a port to run the server on
const port = 3000;

// Serve static files from website folder and connect them with the server
app.use(express.static('website'));

// Keep the server running and listen for activity
app.listen(port, ()=>{
	console.log(`Server running on port: ${port}`);
});


