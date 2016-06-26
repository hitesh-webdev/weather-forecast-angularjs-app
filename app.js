//MODULE

var weatherApp = angular.module('weatherApp', ['ngRoute','ngResource']);


// ROUTES

weatherApp.config(function($routeProvider){

	$routeProvider

			.when('/', {
				templateUrl: 'pages/home.html',
				controller: 'homeController'
			})

			.when('/forecast', {
				templateUrl: 'pages/forecast.html',
				controller: 'forecastController'
			})

			.when('/forecast/:days', {
				templateUrl: 'pages/forecast.html',
				controller: 'forecastController'
			})

});


// SERVICES

weatherApp.service('cityService', function(){
	this.city = "Jaipur";
});


//CONTROLLERS

weatherApp.controller('homeController',['$scope', '$location', 'cityService', function($scope, $location, cityService){
	
	$scope.city = cityService.city;

	$scope.$watch('city', function(){
		 cityService.city = $scope.city;
	});

	$scope.submit = function(){
		$location.path("/forecast");	 
	};


}]);


weatherApp.controller('forecastController',['$scope', '$resource', '$routeParams','cityService', function($scope, $resource, $routeParams, cityService){
	
	$scope.city = cityService.city;

	$scope.days = $routeParams.days || '2';

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP"} });

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days , appid: 'b67087732363e6e8e2ad06524c0de166'});

	console.log($scope.weatherResult);

	$scope.convertToCelsius = function(degK){
		return (degK - 273.15).toFixed(1);
	};

	$scope.convertToDate = function (dt) {
		return new Date(dt * 1000);	  
	};

}]);

