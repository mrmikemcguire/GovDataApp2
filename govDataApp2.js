var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) 
    { 
    $routeProvider
    .when('/', 
        {
        templateUrl: 'pages/chooseNumber.htm',
        controller: 'chooseNumberController'
        })
    
    .when('/frequency', 
        {
        templateUrl: 'pages/frequency.htm',
        controller: 'frequencyController'
        }) 
    });

myApp.service('numberService', function() 
    {
    this.chosenNumber = 10;  
    });

//myApp.service('numberOfDrawings', function() 
//    {
//    this.numberOfDrawings = 50;  
//    });

myApp.controller('chooseNumberController', ['$scope', '$http', 'numberService', function ($scope, $http, numberService) 
    {
    $http.get('https://data.ny.gov/api/views/d6yy-54nr/rows.json?accessType=DOWNLOAD')
        .success(function (result) 
            {
            console.log("Hooray!");
            $scope.numberOfDrawings = result.data.length;
            $scope.winningSeries = [];
            $scope.numbers = [];

            for(var i = 0; i < result.data.length; i++)
                {
                $scope.winningSeries.push(result.data[i][9]);
                $scope.numbers.push($scope.winningSeries[i].substring(0,2));
                $scope.numbers.push($scope.winningSeries[i].substring(3,5));
                $scope.numbers.push($scope.winningSeries[i].substring(6,8));
                $scope.numbers.push($scope.winningSeries[i].substring(9,11));
                $scope.numbers.push($scope.winningSeries[i].substring(12,14));
                $scope.numbers.push($scope.winningSeries[i].substring(15,17));
                }
            })
        .error(function (data, status) 
            {
            console.log("Oops...");
            });
        
    $scope.chosenNumber = numberService.chosenNumber;
    $scope.$watch('chosenNumber', function() 
        {
        numberService.chosenNumber = $scope.chosenNumber; 
        }); 
        
//    $scope.numberOfDrawings = numberOfDrawingsService.numberOfDrawings;
//    $scope.$watch('numberOfDrawings', function() 
//        {
//        numberOfDrawingsService.numberOfDrawings = $scope.numberOfDrawings; 
//        }); 
//    }]);

myApp.controller('frequencyController', ['$scope', 'numberService', function($scope, numberService) 
    {
    $scope.chosenNumber = numberService.chosenNumber;
//    $scope.numberOfDrawings = numberOfDrawingsService.numberOfDrawings;
    }]);




