var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

const sendJSONResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

const doSetAverageRating = function(location){
  let reviewCount, ratingAverage, ratingTotal;

  if(location.reviews && location.reviews.length > 0){
    reviewCount = location.reviews.length;
    ratingTotal = 0;
    for(let count = 0; count < reviewCount; count++){
      ratingTotal = ratingTotal + location.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    location.rating = ratingAverage;
    location.save(function(err){
      if (err) {
        console.log(err);
      }
      else {
        console.log(`Average rating updated to ${ratingAverage}`);  
      }
    });
  }
};

const updateAverageRating = function(locationid){
  Loc
    .findById(locationid)
    .select('rating reviews')
    .exec(
      function(err, location){
        if(!err){
          doSetAverageRating(location);
        }
      });
};

const doAddReview = function(req, res, location){
  if (!location) {
    sendJSONResponse(res, 404, {
      "message": "locationid not found"
    });
  }
  else {
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save(function(err, location){
      let thisReview;
      if(err) {
        sendJSONResponse(res, 400, err);
      }
      else {
        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];
        sendJSONResponse(res, 201, thisReview);
      }
    });  
  }
};

module.exports.reviewsCreate = function (req, res) {
  var locationid = req.params.locationid;

  if (locationid) {
    Loc
      .findById(locationid)
      .select('reviews')
      .exec(
        function(err, location) {
          if (err) {
            sendJSONResponse(res, 400, err);
          } else {
            doAddReview(req, res, location);
          }
        }
      );
  }
  else {
    sendJSONResponse(res, 404, {
      "message": "Not found, locationid required"
    });
  }
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

module.exports.reviewsUpdateOne = function(req, res) {
  if (!req.params.locationid || !req.params.reviewid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('reviews')
    .exec(
      function(err, location) {
        var thisReview;
        if (!location) {
          sendJSONresponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        }
        else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (location.reviews && location.reviews.length > 0) {
          thisReview = location.reviews.id(req.params.reviewid);
          if (!thisReview) {
            sendJSONresponse(res, 404, {
              "message": "reviewid not found"
            });
          } 
          else {
            thisReview.author = req.body.author;
            thisReview.rating = req.body.rating;
            thisReview.reviewText = req.body.reviewText;
            location.save(function(err, location) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } 
              else {
                updateAverageRating(location._id);
                sendJSONresponse(res, 200, thisReview);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No review to update"
          });
        }
      }
  );
};

module.exports.reviewsDeleteOne = function (req, res) {
  sendJSONResponse(res, 200, { "status": "success " });
};