//Server side JS code
/*All required packages*/
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start and instance of the app
const app = express();

/*Middleware
	Configure express to use body-parser as middle-ware
*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// User cors for cross origin allowance
app.use(cors());

// Set a port to run the server on
const port = 3000;
// Keep the server running and listen for activity
app.listen(port, ()=>{
	console.log(`Server running on port: ${port}`);
});