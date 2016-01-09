var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) 
    {
    $http.get('https://data.ny.gov/api/views/d6yy-54nr/rows.json?accessType=DOWNLOAD')
        .success(function (result) 
            {
            $scope.lotteryRecords = result;
            console.log("Hooray!");
            })
        .error(function (data, status) 
            {
            console.log("Oops...");
            });  
    }]);




