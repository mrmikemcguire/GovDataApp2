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

myApp.service('chosenNumberService', function() 
    {
    this.chosenNumber = 10;  
    });

myApp.service('numberOfDrawingsService', function() 
    {
    this.numberOfDrawings = 50;  
    });

myApp.service('numbersArrayService', function() 
    {

    });

myApp.controller('chooseNumberController', ['$scope', '$http', 'chosenNumberService', 'numberOfDrawingsService', 'numbersArrayService', function ($scope, $http, chosenNumberService, numberOfDrawingsService, numbersArrayService) 
    {
    $scope.numbers = [];
    $http.get('https://data.ny.gov/api/views/d6yy-54nr/rows.json?accessType=DOWNLOAD')
        .success(function (result) 
            {
            console.log("Hooray!");
            $scope.numberOfDrawings = result.data.length;
            $scope.winningSeries = [];
            
            for(var i = 0; i < result.data.length; i++)
                {
                $scope.winningSeries.push(result.data[i][9]);
                $scope.numbers.push($scope.winningSeries[i].substring(0,2));
                $scope.numbers.push($scope.winningSeries[i].substring(3,5));
                $scope.numbers.push($scope.winningSeries[i].substring(6,8));
                $scope.numbers.push($scope.winningSeries[i].substring(9,11));
                $scope.numbers.push($scope.winningSeries[i].substring(12,14));
//                $scope.numbers.push($scope.winningSeries[i].substring(15,17));
                }
            })
        .error(function (data, status) 
            {
            console.log("Oops...");
            });
        
    $scope.chosenNumber = chosenNumberService.chosenNumber;   
    $scope.$watch('chosenNumber', function() 
        {
        chosenNumberService.chosenNumber = $scope.chosenNumber; 
        }); 
        
//    $scope.numbers = numbersArrayService.numbers;
    $scope.$watch('numbersArray', function() 
        {
        numbersArrayService.numbers = $scope.numbers; 
        }); 
        
    $scope.numberOfDrawings = numberOfDrawingsService.numberOfDrawings;
    $scope.$watch('numberOfDrawings', function() 
        {
        numberOfDrawingsService.numberOfDrawings = $scope.numberOfDrawings; 
        }); 

    }]);

myApp.controller('frequencyController', ['$scope', 'chosenNumberService', 'numberOfDrawingsService', 'numbersArrayService', function($scope, chosenNumberService, numberOfDrawingsService, numbersArrayService) 
    {
    $scope.numbers = numbersArrayService.numbers;
    $scope.chosenNumber = chosenNumberService.chosenNumber;
    $scope.frequencyCounter = 3;

//    $scope.frequencyCounter = function($scope.chosenNumber)
//            {
//            var count = 0;
//            for (num in $scope.numbers)
//                {
//                if (num === $scope.chosenNumber)
//                    {
//                    count++;
//                    }
//                }
//            return count;
//            };
    
    $scope.numberOfDrawings = numberOfDrawingsService.numberOfDrawings;
    $scope.statisticalFrequency = Math.floor(5 * $scope.numberOfDrawings / 75);
        
    if ($scope.frequencyCounter > $scope.statisticalFrequency)
        $scope.luckiness = "lucky";
    else
        $scope.luckiness = "unlucky";

//    $scope.frequencyCounter = count($scope.chosenNumber);    
//function count(chosenNumber) 
//        {
//        var count = 0;
//        for (num in $scope.numbers)
//            {
//            if (num === chosenNumber)
//                {
//                count++;
//                }
//            }
//        return count;
//        }
    }]);






