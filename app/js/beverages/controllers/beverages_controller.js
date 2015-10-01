module.exports = function(app) {
  app.controller('BeveragesController', ['$scope', '$http', function($scope, $http) {
    $scope.beverages = [];

    $scope.getAll = function() {
      $http.get('/api/beverages')
        .then(function(res) {
          $scope.beverages = res.data;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.createBeverage = function(beverage) {
      $http.post('/api/beverages', beverage)
        .then(function(res) {
          $scope.beverages.push(res.data);
          $scope.newBeverage = null;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.updateBeverage = function(beverage) {
      beverage.status = 'pending';
      $http.put('/api/beverages/' + beverage._id, beverage)
        .then(function(res) {
          delete beverage.status;
          beverage.editing = false;  
        }, function(res) {
          console.log(res);
          beverage.status = 'failed';
          beverage.editing = false;
        });
    };

    $scope.removeBeverage = function(beverage) {
      beverage.status = 'pending';
      $http.delete('/api/beverages/' + beverage._id)
        .then(function() {
          $scope.beverages.splice($scope.beverages.indexOf(beverage), 1);
        }, function(res) {
          beverage.status = 'failed';
          console.log(res);
        });
    };
  }]);
};