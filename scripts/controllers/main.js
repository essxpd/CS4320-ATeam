angular.module('cs4320aTeamApp')
    .controller('MainCtrl', function($scope, $location, $http, $window, $sanitize, $timeout, data){

        $scope.loggedInUser = data.data;

        //Temporary. Vomits all of the previous submissions a user has made into console as objects. Can be interacted with to see data.

        //Grab current URL
        $scope.currentPath = $location.path();

        //Change instruction menu based on ferpa score
        //Show goToForm() if ferpa >= 85
        //Show takeFERPA() if ferpa < 85
        if($scope.loggedInUser.Ferpa_Score > 85){
            $scope.CurrentInstructionSet = true;
        };
    
        if($scope.loggedInUser){
            $http.get('./model/mongoFindAll.php?paw=' + $scope.loggedInUser.SSO).then(function(response){
                $scope.prevForms = response.data;    
            });
        };
 
        // Dummy data for createdForms
        $scope.createdForms = [
            {"id":2345, "name":"myZou"},
            {"id":5432, "name":"other form"}
        ];
    
        //Fix this for your version.
        $scope.mongoForm = function(id){
            angular.forEach(id, function(value, key){
                $window.location.href = "http://a-team.cloudapp.net/Cody/CS4320-ATeam/model/makePDF.php?" + value;
            })
        };
   
    
        //Function to download previously submitted forms. Just a stub for now
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
		
		//NgHide and NgShow to control whether security access questions are revealed
		$scope.askSecQuestions = true;
		
		$scope.studentWorker = false;
		
		//Tied to ngChange on form.html
		//If checkbox is toggled, reveals questions about whether security should be copied
		//If checkbox is toggled back to false, hides questions about copying security and
		//reveals the usual access level questions instead
		$scope.toggleSecQuestions = function(){
			
			if($scope.toggle === true){
			
				$scope.askSecQuestions = false;

            }
            else{
                $scope.askSecQuestions = true;  
            }
                
        };
            
            //Working Security Questions... Formatting is not set yet, question layout is still somewhat unclear.
            $scope.securityLevels = [
                //{"number":"1", "selectedStatus":"", "questions":[{"question":"question1", "status":["view"]},{"question":"question2", "status":["update"]}]},
                //{"number":"2", "selectedStatus":"", "questions":[{"question":"question3", "status":["update"]},{"question":"question4", "status":["view"]}]},
				{"number":"Basic Inquiry", "selectedStatus":"", "questions":[{"question":"Do you need access to bio demo and student data? This includes  names, address, FERPA directory data, photos, term info, degree information, programs, honors and awards, service indicators (holds) and previous schools.", "status":["View"]}]},
				{"number":"Advanced Inquiry", "selectedStatus":"", "questions":[{"question":"Includes Basic Inquiry Access. Check if you also need access to relations with institution, citizenship, visa, decedant data, student enrollment, gpa, term history, 3C's, advisors, student groups", "status":["View", "Update"]}]},
				{"number":"3Cs", "selectedStatus":"", "questions":[{"question":"Checklists, Comments, Communications", "status":["View", "Update"]}]},
				{"number":"Advisor Update", "selectedStatus":"", "questions":[{"question":"Adding an advisor to a student's record", "status":["Update"]}]},
				{"number":"Department SOC Update", "selectedStatus":"", "questions":[{"question":"Scheduling courses, assigning faculty to course, generating permission numbers", "status":["Update"]}]},
				{"number":"Service Indicators (Holds)", "selectedStatus":"", "questions":[{"question":"Administrative users with proper security can assign or remove service indicators from a student's record", "status":["View", "Update"]}]},
				{"number":"Student Group View", "selectedStatus":"", "questions":[{"question":"View groups a student is associated with", "status":["View"]}]},
				{"number":"View Study List", "selectedStatus":"", "questions":[{"question":"View a student's class schedule", "status":["View"]}]},
				{"number":"Registrar Enrollment", "selectedStatus":"", "questions":[{"question":"Adding and dropping a course utilizing Enrollment Request", "status":["View", "Update"]}]},
				{"number":"Advisor Student Center", "selectedStatus":"", "questions":[{"question":"Access to students study list, advisor, program/plan, demographic data, e-mail address", "status":["View"]}]},
				{"number":"Class Permission", "selectedStatus":"", "questions":[{"question":"Creating general or student specific class permission numbers", "status":["Update"]}]},
				{"number":"Class Permission View", "selectedStatus":"", "questions":[{"question":"View class permission numbers which have been created for a course", "status":["View"]}]},
				{"number":"Class Roster", "selectedStatus":"", "questions":[{"question":"View students enrolled, dropped or withdrawn in a course", "status":["View"]}]},
				{"number":"Block Enrollments", "selectedStatus":"", "questions":[{"question":"Adding and dropping a course utilizing Enrollment Request", "status":["View", "Update"]}]},
				{"number":"Report Manager", "selectedStatus":"", "questions":[{"question":"Assists in running various reports", "status":["View"]}]},
				{"number":"Self Service Advisor", "selectedStatus":"", "questions":[{"question":"View Advisee photo, addresses, service indicators, emergency contacts, telephone numbers, grades, class schedule, enrollment appointment, print academic advising profile ", "status":["Update"]}]},
				{"number":"Fiscal Officer", "selectedStatus":"", "questions":[{"question":"View enrollment summary, term statistics, and UM term statistics", "status":["View"]}]},
				{"number":"Academic Advising Profile", "selectedStatus":"", "questions":[{"question":"Allows printing of the Academic Advising Profile", "status":["Update"]}]}
			];
            
            
            // To submit security level request data
            $scope.saveRequest = function(){
                
                //Error Message if fields haven't been entered.
                $scope.saveError = "";
                
                var date = new Date();
                
                //JSON obj to be pushed to mongo // To be changed: swap $scope variables with non-dummy login-acquired data
                var newData = {
                    "date" : date,
                    "paw" : $scope.loggedInUser.SSO,
                    "name" : $scope.loggedInUser.Full_Name,
                    "ferpa" : $scope.loggedInUser.Ferpa_Score,
                    "title" : $scope.loggedInUser.Title,
                    "dept" : $scope.loggedInUser.Department,
                    "id" : $scope.loggedInUser.Employee_ID,
                    "addr" : $scope.loggedInUser.Campus_Address,
                    "phoneNum" : $scope.loggedInUser.Phone_Number,
                    "requestType" : $scope.requestType,
                    "studentWorker" : $scope.studentWorker,
                    "explainRequest" : $sanitize($scope.explainRequest),
                    "securityLevels" : $scope.securityLevels
                };
                
                //Replace securityLevels with the information from copySecurity if they've elected to do that instead.
                if($scope.toggle === true){ //If copySecurity was selected,
                    //Fill in copySecurity array with text input. ToDo: Sanitize
                    $scope.copySecurity = [
                        {"name": $scope.copySecurity.empName},
                        {"position": $scope.copySecurity.empPosition},
                        {"pawprint": $scope.copySecurity.empPawprint},
                        {"empId": $scope.copySecurity.empId}
                    ];
                    if($scope.currentEmpCopy){
                        $scope.copySecurity = $scope.copySecurity.concat([
                            {"currentEmployee" : $scope.currentEmpCopy}
                        ]);
                    } else{
                        $scope.copySecurity = $scope.copySecurity.concat([
                            {"formerEmployee" : $scope.formerEmpCopy}
                        ]);
                    }
                    newData.securityLevels = angular.copy($scope.copySecurity);
                    
                }
                
                //If type of request hasn't been specified, change error msg to what's below and return.
                if(!$scope.requestType){
                    $scope.saveError = "Please choose which type of request you would like to make.";
                    return;
                }
                
                if(!$scope.explainRequest){
                    $scope.saveError = "Please describe the type of access needed in the large space provided.";
                    return;
                }
                
                console.dir(newData); // Show what's being saved. For testing.
                
                // Inserts data into mongo, Temp notifies you in console when success
                $.ajax({
                    type: "POST",
                    url: './model/mongoScript.php',
                    data: {data : newData},
                    success: function(data){console.log(data);},
                    error: function(errorThrown){$scope.saveError = errorThrown;}
                });
            };
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