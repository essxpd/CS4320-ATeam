angular.module('cs4320aTeamApp')
    .controller('MainCtrl', function($scope, $location, $http, $window){
        /* Temporary applicant name and ferpa score to make UI skeleton look a little better
        Be sure to Delete once real data is being brought in */
        $scope.name = "John Doe";
        $scope.ferpa = 86;
        $scope.DoB = new Date("September 1, 1939");
        $scope.title = "Director";
        $scope.dept = "The Dept";
        $scope.paw = "jdoe39";
        $scope.id = "11111111";
        $scope.addr = "1111 East Broadway";
        $scope.phoneNum = "(555)555-5555";
        /* Delete above code once real data is brought in */
    
        $scope.login = function(){
            var config = {
                url: '/model/auth.php',
                method: 'POST',
                data: {
                    username: $scope.user.username,
                    password: $scope.user.password
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
            $http(config)
            .success(function(data, status, headers, config){
                if(data.status){
                    $scope.user.fname = data.fname;
                    $scope.user.lname = data.lname;
                    $scope.user.fullName = data.fname + " " + data.lname;
                    $scope.user.ferpa = data.ferpa;
                    $scope.user.dob = data.dob;
                    $scope.user.title = data.title;
                    $scope.user.dept = data.dept;
                    $scope.user.empID = data.empID;
                    $scope.user.campAddr = data.campAddr;
                    $scope.user.phoneNum = data.phoneNum;
                    $location.path('/');
                } 
                else{
                    $scope.errorMsg = 'Login has failed. Please check your name and password then try again.';
                }
            })
            .error(function(data, status, headers, config){
                $scope.errorMsg = "There has been a problem with your login. Please contact so&so@mizzou.edu for support."
            });
        };
    
        //Grab current URL
        $scope.currentPath = $location.path();

        //Change instruction menu based on ferpa score
        //Show goToForm() if ferpa >= 85
        //Show takeFERPA() if ferpa < 85
        if($scope.ferpa > 85){
            $scope.CurrentInstructionSet = true;
        };
    
        //Dummy data for prevForms -- Delete for production
        $scope.prevForms = [
            {"id":1421, "name":"form1"},
            {"id":7431, "name":"form41"}
        ];
 
	// Dummy data for createdForms
	$scope.createdForms = [
	    {"id":2345, "name":"myZou"},
	    {"id":5432, "name":"other form"}
	];
   
        $scope.downloadForm = function(id){
            $window.alert("You just tried to download form " + id + "!");
        }

	$scope.downloadCreatedForm = function(id) {
	    $window.alert("You just tried to download form " + id + "!");
	}

        //On click, changes url to root/form, triggering a view change
        $scope.goToForm = function(){
            $location.path('/form');
        }

	// Redirects to usets home
	$scope.goToHome = function() {
	    $location.path('/');
	}	

        //When user clicks Take FERPA Quiz button, redirect user to ferpa quiz page
        $scope.takeFERPA = function(){
            $window.location.href = "http://myzoutraining.missouri.edu/ferpa.html";
        }

	// Take the user to the form creator
	$scope.createForm = function() {
	    $location.path('/createForm');
	}	

	// Will redirect to a place to edit forms
	$scope.editForm = function(id) {
	    $window.alert("You just tried to edit form " + id + "!");
	}

	// Will remove the form 
	$scope.removeForm = function(id) {
	    $response = $window.confirm("Are you sure you would like to remove this form?");
	    if($response) {
		$window.alert("You just tried to delete form " + id + "!");
	    }
	}

        //If on form page, do this
        if($scope.currentPath === '/form'){
            /* Edit and uncomment once php is implemented.
            $http.get('/model/secLevels.php')
            .success(function(response){
                $scope.securityLevels = response.securityLevels;
            });
            */
            
            //NgHide and NgShow to control whether security access questions are revealed
            $scope.askSecQuestions = true;
            
            //Tied to ngChange on form.html
            //If checkbox is toggled, reveals questions about whether security should be copied
            //If checkbox is toggled back to false, hides questions about copying security and
            //reveals the usual access level questions instead
            $scope.toggleSecQuestions = function(){
                
                if($scope.toggle === true){
                
                    $scope.askSecQuestions = false;

                    $scope.copySecurity = [
                        {"name":""},
                        {"position":""},
                        {"pawprint":""},
                        {"empId": ""}
                    ];
                }
                else{
                    $scope.askSecQuestions = true;  
                }
                
            };
            
            //Temp dummy data for securityLevels object
            $scope.securityLevels = [
                {"number":"1", "questions":[{"question":"question1", "status":["view"]},{"question":"question2", "status":["update"]}]},
                {"number":"2", "questions":[{"question":"question3", "status":["update"]},{"question":"question4", "status":["view"]}]}
            ];

            /* To submit security level request data
            $scope.saveRequest = function(){
               $http.post('/model/saveRequest.php', {
                    requestType: $scope.requestType,
                    studentWorker: $scope.studentWorker,
                    secAnswers: $scope.securityLevels
                }); 
            }
            */

        }
	// If on the create form page then load form-builder
	else if($scope.currentPath === '/createForm') {
		fb = new Formbuilder({
			selector: '.fb-main',
		});
		// Dumps the save to the console
		fb.on('save', function(payload) {
			console.log(payload);
		});

		// Set the width of the form builder equal to the jumbotron
		$(".fb-body").outerWidth($(".jumbotron").outerWidth());
		$(window).resize(adjust);
		function adjust() {
			$(".fb-body").outerWidth($(".jumbotron").outerWidth());
		}
	}
      });
