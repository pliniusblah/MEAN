var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

const theEarth = (function() {
  var earthRadius = 6371;

  var getDistanceFromRads = function (rads) {
    return parseFloat(rads * earthRadius);    
  };

  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / earthRadius);
  };

  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  }
})();

module.exports.locationsListByDistance = function (req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };

  var geoOptions = {
    spherical: true,
    maxDistance: theEarth.getRadsFromDistance(20),
    num: 10
  };

  if(!lng || !lat){
    sendJSONResponse(res, 404, {
      "message": "lng and lat query parameters are required"
    });
    return;
  }

  Loc.geoNear(point, geoOptions, function(err, results, stats){
    let locations =[];

    if(err) {
      sendJSONResponse(res, 404, err);
    }
    else {
      results.forEach(function(doc){
        locations.push({
          distance: theEarth.getDistanceFromRads(doc.his),
          name: doc.obj.name,
          address: doc.obj.address,
          rating: doc.obj.rating,
          facilities: doc.obj.facilities,
          _id: doc.obj._id
        });
      });
      sendJSONResponse(res, 200, locations);
    }
  });
};

module.exports.locationsCreate = function (req, res) {
  sendJSONResponse(res, 200, { "status": "success" });
};

module.exports.locationsReadOne = function (req, res) {
  if(req.params && req.params.locationid) {
    Loc
    .findById(req.params.locationid)
    .exec(function(err, location){
      if(!location) {
        sendJSONResponse(res, 404, {
          "message": "location not found"
        });
        return;
      }
      else if(err) {
        sendJSONResponse(res, 404, err);
        return;
      }
      sendJSONResponse(res, 200, location);
    });
  }
  else {
    sendJSONResponse(res, 404, {
      "message": "No locationid in request"
    });
  }
};

module.exports.locationsUpdateOne = function (req, res) {
  sendJSONResponse(res, 200, { "status": "success" });
};

module.exports.locationsDeleteOne = function (req, res) {
  sendJSONResponse(res, 200, { "status": "success" });
};