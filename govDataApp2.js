var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) 
    {
    $http.get('https://data.ny.gov/api/views/d6yy-54nr/rows.json?accessType=DOWNLOAD')
        .success(function (result) 
            {
            console.log("Hooray!");
            $scope.winningSeries = [];
            for(var i = 0; i < result.data.length; i++)
                {
                $scope.winningSeries.push(result.data[i][9]);
                }
            })
        .error(function (data, status) 
            {
            console.log("Oops...");
            });
    }]);




