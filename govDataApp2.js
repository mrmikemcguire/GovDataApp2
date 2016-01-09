var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) 
    {
    $http.get('http://data.consumerfinance.gov/api/views.json')
        .success(function (result) 
            {
            $scope.complaints = result;
            console.log("Hooray!");
            })
        .error(function (data, status) 
            {
            console.log("Oops...");
            });  
    }]);




