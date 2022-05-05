const dotenv = require('dotenv').config()
const env = dotenv.parsed

module.exports.homeList = function(req, res){
    res.render('locations-list', {
      title: 'Loc8r - find a place to work with wifi',
      pageHeader: {
        title: 'Loc8r',
        strapline: 'Find places to work wifi wifi near you!'
      },
      sidebar: "Looking for wifi and a seat? Loc8r helps you find a places to work when out and about. Perhaps wirh coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
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