var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/beverages_dev');

app.use(express.static(__dirname + '/build'));
var beveragesRouter = require(__dirname + '/routes/beverages_routes');
app.use('/api', beveragesRouter);

var port = process.env.PORT || 3000;
module.exports = app.listen(port, function() {
  console.log('server up on port: ' + port);
});

