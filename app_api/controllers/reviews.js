var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.reviewsCreate = function (req, res) {
  sendJSONResponse(res, 200, { "status": "success " });
};

module.exports.reviewsReadOne = function (req, res) {
  if(req.params && req.params.locationid && req.params.reviewid){
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(
        function(err, location) {
          let response, review;
          if(!location) {
            sendJSONResponse(res, 404, {
              "message": "locationid not found"
            });
            return;
          }
          else if(err) {
            sendJSONResponse(res, 404, err);
            return;
          }
          if(location.reviews && location.reviews.length > 0) {
            review = location.reviews.id(req.params.reviewid);
            if(!review) {
              sendJSONResponse(res, 404, {
                "message": "reviewid not found"
              });
            }
            else {
              response = {
                location: {
                  name: location.name,
                  id: req.params.locationid
                },
                review: review
              };
              sendJSONResponse(res, 200, response);
            }
          } 
          else {
            sendJSONResponse(res, 404, {
              "message": "No reviews found"
            });
          }
        }
      );
  }
  else {
    sendJSONResponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
  }
};

module.exports.reviewsUpdateOne = function (req, res) {
  sendJSONResponse(res, 200, { "status": "success " });
};

module.exports.reviewsDeleteOne = function (req, res) {
  sendJSONResponse(res, 200, { "status": "success " });
};