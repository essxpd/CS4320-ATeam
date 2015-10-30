"use strict";
angular.module('cs4320aTeamApp', ["ngRoute"])
	.config(["$routeProvider", function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "views/applicant.html",
				controller: "MainCtrl",
			})
			.otherwise({
				redirectTo: "/"
			});
	}]);

	

