const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '289e8949a1d5480ca432bbdd6a68d3d8'
});

const handleApiCall =(req, res) => {
app.models.predict({
    id:'f76196b43bbd45c99b4f3cd8e8b40a8a', 
    version:'45fb9a671625463fa646c3523a3087d5'}, 
    req.body.input) 
    .then(data => {
        res.json(data);
    })  
    .catch(err => res.status(400).json('unable to work with API')) 
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
    	res.json(entries[0]);
    })	
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}
