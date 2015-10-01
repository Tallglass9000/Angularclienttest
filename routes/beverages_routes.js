var Beverage = require('./../models/beverage');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var beveragesRoute = module.exports = exports = express.Router();

beveragesRoute.get('/beverages', function (req, res) {
  Beverage.find({}, function (err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

beveragesRoute.post('/beverages', jsonParser, function( req, res) {
  var newBeverage = new Beverage(req.body);
  newBeverage.save(function (err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

beveragesRoute.put('/beverages/:id', jsonParser, function (req, res) {
  var newBeverageBody = req.body;
  delete newBeverageBody._id;
  Beverage.update({_id: req.params.id}, newBeverageBody, function (err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});

beveragesRoute.delete('/beverages/:id', function (req, res) {
  Beverage.remove({_id: req.params.id}, function (err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});