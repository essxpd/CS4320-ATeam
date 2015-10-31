angular.module('cs4320aTeamApp')
  .controller('MainCtrl', function($scope, $location, $http){
  	/* Temporary applicant name and ferpa score to make UI skeleton look a little better
	Be sure to Delete once real data is being brought in */
	$scope.applicant = "John";
	$scope.name = "John Doe";
	$scope.ferpa = 91;
	/* Delete above code once real data is brought in */

	//Grab current URL
	$scope.currentPath = $location.path();

	//Change instruction menu based on ferpa score
	if($scope.ferpa > 85){
		$scope.CurrentInstructionSet = true;
	};
	
	//On click, changes url to root/form, triggering a view change
	$scope.goToForm = function(){
   		$location.path('/form');
	}

	//If on form page, do this
	if($scope.currentPath === '/form'){
    		/*
    		$http.get('/model/secLevels.php')
    		.success(function(response){
        		$scope.securityLevels = response.securityLevels;
    		});
    		*/
    		var secLevels = [
			{"number":"1", "questions":["quesiton1","question2"]},
			{"number":"2", "questions":["question3","question4"]}
		];
		$scope.securityLevels = secLevels;
	};
  });
