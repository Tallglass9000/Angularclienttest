var mongoose = require('mongoose');

var beverageSchema = new mongoose.Schema({
  beverageBody: String
});

module.exports = mongoose.model('Beverage', beverageSchema);