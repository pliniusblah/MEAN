const dotenv = require('dotenv').config()
const env = dotenv.parsed

module.exports.homeList = function(req, res){
    res.render('locations-list', {
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
        title: 'Loc8r',
        strapline: 'Find places to work wifi wifi near you!'
      },
      locations: [{
        name: 'Starcups',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 3,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '100m'
      },
      {
        name: 'Cafe Hero',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 4,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '200m'
      },
      {
        name: 'Pizza Discovery',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 2,
        facilities: ['Food', 'Premium wifi'],
        distance: '250m'
      }]
    });
};

module.exports.locationInfo = function(req, res){
    let googleApiKey = env.GOOGLE_API_KEY
    res.render('location-info', { title: 'Location Info', apiKey: googleApiKey });
};

module.exports.addReview = function(req, res){
    res.render('location-review-form', { title: 'Add review' });
};