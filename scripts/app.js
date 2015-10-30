angular.module('cs4320aTeamApp', ['ngRoute'])

  .config(function($routeProvider){
      $routeProvider.when("/",
        {
          templateUrl: "applicant.html",
          controller: "MainCtrl",
          controllerAs: "main"
        }
    )
    .when("/form",
        {
          templateUrl: "form.html",
          controller: "MainCtrl",
          controllerAs: "main"
        }
    )
    .otherwise({
      redirectTo: "/"
    });
  })
