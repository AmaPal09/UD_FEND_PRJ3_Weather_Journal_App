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
		console.log("Got response");
		console.log(newData);
	    return newData;
	}catch(error) {
		console.log("error", error);
	}
}


// POST request sent to the server
postData('/addRating', {ratingScore:2});