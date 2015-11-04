"use strict";
angular.module('cs4320aTeamApp', ["ngRoute", "ngSanitize"])
	.config(["$routeProvider", function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "views/applicant.html",
				controller: "MainCtrl",
			})
			.when("/form",{
				templateUrl: "views/form.html",
				controller: "MainCtrl"
			})
			.otherwise({
				redirectTo: "/"
			});
	}]);
