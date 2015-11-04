"use strict";
angular.module('cs4320aTeamApp', ["ngRoute"])
	.config(["$routeProvider", function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "views/admin.html",
				controller: "MainCtrl",
			})
			.when("/form",{
				templateUrl: "views/form.html",
				controller: "MainCtrl"
			})
			.when("/createForm",{
				templateUrl: "views/createForm.html",
				controller: "MainCtrl"
			})
			.when("/collapseMain", {
				redirectTo: "/"
			})
			.when("/admin", {
				templateUrl: "views/admin.html",
				controller: "MainCtrl"
			})
			.when("/error",{
				templateUrl: "views/error.html",
				controller: "MainCtrl"
			})
			.otherwise({
				templateUrl: "views/404.html",
				controller: "MainCtrl"
			});
	}]);
