var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) 
    {
    $http.get('https://data.ny.gov/api/views/d6yy-54nr/rows.json?accessType=DOWNLOAD')
        .success(function (result) 
            {
//            $scope.lotteryRecords = result;
            console.log("Hooray!  " + result.data[0][9]);
            $scope.winningNumbers = [];
            for(var i = 0; i < 50; i++)
                {
                $scope.winningNumbers.push(result.data[i][9]);
                }
            })
        .error(function (data, status) 
            {
            console.log("Oops...");
            });
    }]);




