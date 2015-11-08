"use strict";
angular.module('cs4320aTeamApp', ["ngRoute", "ngSanitize"])
	.config(["$routeProvider", function($routeProvider){
		$routeProvider
			.when("/", {
				templateUrl: "views/applicant.html",
				controller: "MainCtrl",
                resolve: {
                    data: function($q, $http){
                        var deferred = $q.defer();
                        $http({method: 'GET', url: './model/biodata.php'}).then(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                }
			})
			.when("/form",{
				templateUrl: "views/form.html",
				controller: "MainCtrl",
                resolve: {
                    data: function($q, $http){
                        var deferred = $q.defer();
                        $http({method: 'GET', url: './model/biodata.php'}).then(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                }
			})
			.when("/createForm",{
				templateUrl: "views/createForm.html",
				controller: "MainCtrl"
			})
			.when("/collapseMain", {
				redirectTo: "/"
			})
			.when("/collapseMainAdmin", {
				redirectTo: "/admin"
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
				redirectTo: '/'
			});
	}]);
