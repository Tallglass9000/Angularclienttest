require('angular/angular');

var beveragesApp = angular.module('beveragesApp', []);
require('./beverages/beverages')(beveragesApp);