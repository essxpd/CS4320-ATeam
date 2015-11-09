angular.module('cs4320aTeamApp')
    .controller('MainCtrl', function($scope, $location, $http, $window, $sanitize){
        /* Temporary applicant name and ferpa score to make UI skeleton look a little better
        Be sure to Delete once real data is being brought in */
        $scope.name = "John Doe";
        $scope.title = "Director";
        $scope.dept = "The Dept";
        $scope.paw = "jdoe39";
        $scope.id = "11111111";
        $scope.addr = "1111 East Broadway";
        $scope.phoneNum = "(555)555-5555";
		$scope.ferpa = 86;

	$scope.role = "";
	$scope.role.update = false;
	$scope.role.view = false;
	$scope.roleNames = [];
	$scope.form = "";
	$scope.addedRoles = [];

        /* Delete above code once real data is brought in */

		//this is going to be the code to dynamically bring in the bio-data, the php script needs to be created first, once that is done then the above code and be removed and this can be implemented
		/*function get_bio_data(){
			//we will need to create a new script called get_bio_data.php that returns the sessions information here
			$.ajax({
                type: "GET",
                url: './model/get_bio_data.php',
                data: {},
                success: function(data){console.log(data);
					var tempArray = [];
					for(var key in data){
						tempArray.push(data[key]);
					}
					//assumes the data in the session is stored in the same order as it appears in the user table of the mysql database
					//sets each scope variable equivalent to its corresponding bio-data from the mysql database
					$scope.name = tempArray[0];
					$scope.title = tempArray[1];
					$scope.dept = tempArray[2];
					$scope.paw = tempArray[3];
					$scope.id = tempArray[4];
					$scope.addr = tempArray[5];
					$scope.phoneNum = tempArray[6];
					$scope.ferpa = tempArray[7];
				},
                error: function(errorThrown){$scope.saveError = errorThrown;}
            });
		};*/
		
		

    
        /* Login. Temporarily commented out while we determine best way to handle routing.
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
                    
                    //Temporary. Vomits all of the previous submissions a user has made into console as objects. Can be interacted with to see data.
                    $.ajax({
                        url: './model/mongoScript.php',
                        type: 'GET',
                        dataType: 'json',
                        data: {pawprint: $scope.paw},
                        success: function(data){
                            $.each(data, function(key, value){
                                console.dir(value);    
                            });
                        }
                    });
                } 
                else{
                    $scope.errorMsg = 'Login has failed. Please check your name and password then try again.';
                }
            })
            .error(function(data, status, headers, config){
                $scope.errorMsg = "There has been a problem with your login. Please contact so&so@mizzou.edu for support."
            });
        };
        */
    
        //Temporary. Vomits all of the previous submissions a user has made into console as objects. Can be interacted with to see data.
        $.ajax({
            url: './model/mongoScript.php',
            type: 'GET',
            dataType: 'json',
            data: {pawprint: $scope.paw},
            success: function(data){
                $.each(data, function(key, value){
                    console.dir(value);    
                });
            }
        });

        //Grab current URL
        $scope.currentPath = $location.path();

        //Change instruction menu based on ferpa score
        //Show goToForm() if ferpa >= 85
        //Show takeFERPA() if ferpa < 85
        if($scope.ferpa > 85){
            $scope.CurrentInstructionSet = true;
        };
    
        //Dummy data for prevForms -- just to give an idea waht it'll be like. -- Delete for production
        $scope.prevForms = [
            {"id":1421, "name":"form1"},
            {"id":7431, "name":"form41"}
        ];
 
	// Dummy data for createdForms
	$scope.createdForms = [
	    {"id":2345, "name":"myZou"},
	    {"id":5432, "name":"other form"}
	];
   
    
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
                
                //JSON obj to be pushed to mongo // To be changed: swap $scope variables with non-dummy login-acquired data
                var newData = {
                    "paw" : $scope.paw,
                    "name" : $scope.name,
                    "ferpa" : $scope.ferpa,
                    "title" : $scope.title,
                    "dept" : $scope.dept,
                    "id" : $scope.id,
                    "addr" : $scope.addr,
                    "phoneNum" : $scope.phoneNum,
                    "requestType" : $scope.requestType,
                    "studentWorker" : $scope.studentWorker,
                    "explainRequest" : $sanitize($scope.explainRequest),
                    "securityLevels" : $scope.securityLevels
                };
                
                //Replace securityLevels with the information from copySecurity if they've elected to do that instead.
                if($scope.toggle === true){
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


	// Adds a role when creating a form
	$scope.addRole = function()
	{
		$scope.saveError = "";

                // Check that all of the form was filled out
                if(!$scope.role.name) {
                        $scope.saveError = "Please give your role a name.";
                        return "";
                }
                if(!$scope.role.description) {
                        $scope.saveError = "Please give a description for the function of the role.";
                        return "";
                }
                if(!$scope.role.update && !$scope.role.view) {
                        $scope.saveError = "Must have atleast one access type selected.";
                        return "";
                }
		
                // Prevent duplicate roles with same name
                angular.forEach( $scope.addedRoles, function(value, key) {
                        if(value.name === $scope.role.name)
                        {
                                $scope.saveError = "That role already exists.";
                                return "";
                        }
                });

                if($scope.saveError)
                        return "";
               
		$scope.roleNames.push( { 'name' : $scope.role.name } );
		
                // Copy the role data into a new div
                roleInfo = "<div id='" + $scope.role.name + "' class='role'>";
                roleInfo += "<h4><b>" + $scope.role.name + "</b></h4><hr class='hr-black'>";

                roleInfo += '<input type="button" class="btn btn-role btn-lg btn-danger" ng-click="removeRole(\'' + $scope.role.name + '\')" value="Remove">';
                roleInfo += "<addbuttons></addbuttons>";
                roleInfo += "<div class='space-for-buttons'></div>";
                roleInfo += "<p class='description'><b>Description:</b> " + $scope.role.description + "</p>";
                roleInfo += "<b>Access type options:</b> <ul class='list-inline'>";
                if($scope.role.update)
                        roleInfo += "<li class='glyphicon glyphicon-ok'>update</li>";
                else
                        roleInfo += "<li class='glyphicon glyphicon-remove'>update</li>";
                if($scope.role.view)
                        roleInfo += "<li class='glyphicon glyphicon-ok'>view</li>";
                else
                        roleInfo += "<li class='glyphicon glyphicon-remove'>view</li>";

                roleInfo += "<ul>";
                roleInfo += "</div>";

		if(!$scope.role.update)
			$scope.role.update = false;
		if(!$scope.role.view)
			$scope.role.view = false;

                $scope.addedRoles.push({'name': $scope.role.name,
					'description': $scope.role.description,
					'update': $scope.role.update,
					'view': $scope.role.view });

	}

	$scope.removeRole = function(removal) {
		
		for(var i = 0; i < $scope.addedRoles.length; i++) {
			if($scope.addedRoles[i].name == removal)
				$scope.addedRoles.splice(i, i + 1);
		}
	}

	$scope.submitCreatedForm = function() {
		$scope.submitError = "";
		if(!$scope.form.name) {
			$scope.submitError = "Insert form name.";
			return;
		}
		if($scope.addedRoles.length < 1) {
			$scope.submitError = "Atleast one security role must be added.";
			return;
		}


		// Submit the packaged form data to mongo
	
		alert();
	}
	/*
	$scope.editRole = function() {
		alert('editing');
	}*/
})
/*
.directive('addrole', function($compile) {
	return function(scope, element, attrs) {
		element.bind('click', function() {
			roleInfo = scope.addRoleHTML();
			if(roleInfo !== "")
			{
				console.log(roleInfo);
				scope.addedRoles.push();
				$("#roleTitle").attr("hidden", false);
				angular.element($("#added-roles")).append($compile(roleInfo)(scope));
			}
			scope.$apply();
		});
	}
});
*/
