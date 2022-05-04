const dotenv = require('dotenv').config()
const env = dotenv.parsed

module.exports.homeList = function(req, res){
    res.render('locations-list', { title: 'Home' });
};

module.exports.locationInfo = function(req, res){
    let googleApiKey = env.GOOGLE_API_KEY
    res.render('location-info', { title: 'Location Info', apiKey: googleApiKey });
};

module.exports.addReview = function(req, res){
    res.render('location-review-form', { title: 'Add review' });
};