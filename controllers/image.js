const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '531db8e76d3240ca9062e9530ca4f6f4'
});

handleImage = (req, res, database) => {
	database('users')
	.where({email: req.body.email})
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => {
		res.status(400).json('Something went wrong when updating the entry count in the database')

	})
}

handleApiCall = (req, res) => {		
	console.log('Got a request: ' + req.body.imageURL)
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageURL)
        .then(response => {
          res.json(response);
        })
        .catch(err => {
          res.status(400).json('Failed to connect to clarifai');
        });
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}