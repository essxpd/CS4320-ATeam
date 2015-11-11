angular.module('cs4320aTeamApp')
    .controller('MainCtrl', function($scope, $location, $http, $window, $sanitize, $timeout, data){

	$scope.isopen = false;
	$scope.role = "";
	$scope.role.update = false;
	$scope.role.view = false;
	$scope.roleNames = [];
	$scope.form = "";
	$scope.addedRoles = [];

	//User data is stored here.
	$scope.loggedInUser = data.data;

	//Grab current URL
	$scope.currentPath = $location.path();

	//Change instruction menu based on ferpa score
	//Show goToForm() if ferpa >= 85
	//Show takeFERPA() if ferpa < 85
	if($scope.loggedInUser.Ferpa_Score > 85){
		$scope.CurrentInstructionSet = true;
	}
    
    function refresh(){
        
        if($scope.loggedInUser){
            $http.get('./model/mongoFindAll.php?paw=' + $scope.loggedInUser.SSO).then(function(response){
                $scope.prevForms = response.data;    
            });
        }
    }
    
	if($scope.loggedInUser.User_Type == 'employer')
	{
		$http.get('./model/mongoGetDept.php?dept=' + $scope.loggedInUser.Department).then(function(response){
			$scope.deptForms = response.data;
		});
	}
    
   $scope.mongoForm = function(id){
		var absUrl = $location.absUrl();
		var path = $location.path();
		var str = "#" + path;
		str = new RegExp(str, "g");
		var locStr = absUrl.replace(str, "");
		//var strToReplace = new RegExp(str, "g");
		var htmlToPass = $scope.getSecurityRequestBoxes();
		angular.forEach(id, function(value, key){
			var newLoc;
			newLoc = locStr + "model/makePDF.php?" + value + "&htmlObject=" + htmlToPass;
			$window.location.href = newLoc;
		})
	};
    
   $scope.findallforms = function(){
		$http.get('./model/mongoFindAll.php?paw=' + $scope.search).then(function(response){
		$scope.allForms = response.data;
	});
   };

	function goToHome(){
		$location.path('/');
	}
    
    if($scope.currentPath === '/'){
        refresh();
    }

	$scope.groups = [
		{
		  title: "Dynamic Group Header - 1",
		  content: "Dynamic Group Body - 1",
		  open: false
		},
		{
		  title: "Dynamic Group Header - 2",
		  content: "Dynamic Group Body - 2",
		  open: false
		}
  	];

	$scope.downloadCreatedForm = function(id) {
	    $window.alert("You just tried to download form " + id + "!");
	};

	//On click, changes url to root/form, triggering a view change
	$scope.goToForm = function(){
		$location.path('/form');
	};

	// Redirects to usets home
	$scope.goToHome = function() {
	    $location.path('/');
	};

	//When user clicks Take FERPA Quiz button, redirect user to ferpa quiz page
	$scope.takeFERPA = function(){
		$window.location.href = "http://myzoutraining.missouri.edu/ferpa.html";
	};

	// Take the user to the form creator
	$scope.createForm = function() {
	    $location.path('/createForm');
	};

	// Will redirect to a place to edit forms
	$scope.editForm = function(id) {
		//$location.path('/createForm');
		$window.alert("You just tried to edit form " + id + "!");
	};

	// Will remove the form 
	$scope.removeForm = function(id) {
		var $response = $window.confirm("Are you sure you would like to remove this form?");
	    if($response) {
			$window.alert("You just tried to delete form " + id + "!");
	    }
	};

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
		{"type":"Student Records access", "questionsArr":[
			{"number":"Basic Inquiry", "selectedStatus":[], "questions":[{"question":"Do you need access to bio demo and student data? This includes  names, address, FERPA directory data, photos, term info, degree information, programs, honors and awards, service indicators (holds) and previous schools.", "status":["View"]}]},
			{"number":"Advanced Inquiry", "selectedStatus":[], "questions":[{"question":"Includes Basic Inquiry Access. Check if you also need access to relations with institution, citizenship, visa, decedant data, student enrollment, gpa, term history, 3C's, advisors, student groups", "status":["View", "Update"]}]},
			{"number":"3Cs", "selectedStatus":[], "questions":[{"question":"Checklists, Comments, Communications", "status":["View", "Update"]}]},
			{"number":"Advisor Update", "selectedStatus":[], "questions":[{"question":"Adding an advisor to a student's record", "status":["Update"]}]},
			{"number":"Department SOC Update", "selectedStatus":[], "questions":[{"question":"Scheduling courses, assigning faculty to course, generating permission numbers", "status":["Update"]}]},
			{"number":"Service Indicators (Holds)", "selectedStatus":[], "questions":[{"question":"Administrative users with proper security can assign or remove service indicators from a student's record", "status":["View", "Update"]}]},
			{"number":"Student Group View", "selectedStatus":[], "questions":[{"question":"View groups a student is associated with", "status":["View"]}]},
			{"number":"View Study List", "selectedStatus":[], "questions":[{"question":"View a student's class schedule", "status":["View"]}]},
			{"number":"Registrar Enrollment", "selectedStatus":[], "questions":[{"question":"Adding and dropping a course utilizing Enrollment Request", "status":["View", "Update"]}]},
			{"number":"Advisor Student Center", "selectedStatus":[], "questions":[{"question":"Access to students study list, advisor, program/plan, demographic data, e-mail address", "status":["View"]}]},
			{"number":"Class Permission", "selectedStatus":[], "questions":[{"question":"Creating general or student specific class permission numbers", "status":["Update"]}]},
			{"number":"Class Permission View", "selectedStatus":[], "questions":[{"question":"View class permission numbers which have been created for a course", "status":["View"]}]},
			{"number":"Class Roster", "selectedStatus":[], "questions":[{"question":"View students enrolled, dropped or withdrawn in a course", "status":["View"]}]},
			{"number":"Block Enrollments", "selectedStatus":[], "questions":[{"question":"Adding and dropping a course utilizing Enrollment Request", "status":["View", "Update"]}]},
			{"number":"Report Manager", "selectedStatus":[], "questions":[{"question":"Assists in running various reports", "status":["View"]}]},
			{"number":"Self Service Advisor", "selectedStatus":[], "questions":[{"question":"View Advisee photo, addresses, service indicators, emergency contacts, telephone numbers, grades, class schedule, enrollment appointment, print academic advising profile ", "status":["Update"]}]},
			{"number":"Fiscal Officer", "selectedStatus":[], "questions":[{"question":"View enrollment summary, term statistics, and UM term statistics", "status":["View"]}]},
			{"number":"Academic Advising Profile", "selectedStatus":[], "questions":[{"question":"Allows printing of the Academic Advising Profile", "status":["Update"]}]}
			]
		},
		{"type":"Admissions Access", "questionsArr":[
			{"number":"ALL", "selectedStatus":"", "questions":[{"question":"everything"}]}
			]
		},
		{"type":"Student Financials (Cashiers) Access", "questionsArr":[
			{"number":"SF General Inquiry", "selectedStatus":[], "questions":[{"question":"For Staff Outside of the Cashiers office", "status":["View"]}]}
			]
		}
	];

	$scope.setStatusOfCheckBox = function(status, question){
		//console.log(status);
		//console.log(question);
		//console.log(level);
		if(question.selectedStatus.indexOf(status) > -1){
			question.selectedStatus.splice(question.selectedStatus.indexOf(status), 1);
		}else{
			question.selectedStatus.push(status);
		}
		$scope.getSecurityRequestBoxes();
		//console.dir($scope.securityLevels);
	};

	$scope.getSecurityRequestBoxes = function(){
		var htmlObject = "";
		var instanceCounter;
		for (var key in $scope.securityLevels) {
			instanceCounter = 0;
			var level = $scope.securityLevels[key];
			for (var key2 in level.questionsArr) {
				var question = level.questionsArr[key2];
				if (question.selectedStatus.length > -1) {
					if (instanceCounter == 0) {
						htmlObject = htmlObject + "<h4>Requested security states from " + level.type + "</h4><br>";
					}
					htmlObject = htmlObject + "<p>For " + question.number + "level : Requesting ";
					for (var key3 in question.selectedStatus) {
						var status = question.selectedStatus[key3];
						if (key == 0) {
							htmlObject = htmlObject + status + ", and ";
						} else {
							htmlObject = htmlObject + status + ".";
						}
					}
					htmlObject = htmlObject + "</p><br>";
					++instanceCounter;
				}
			}
		}
		return htmlObject;
	};
            
            
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
			success: function(){
				refresh();
				goToHome();
			},
			error: function(errorThrown){$scope.saveError = errorThrown;}
		});
	};

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
               
		if(!$scope.role.update) {
			$scope.role.update = false;
        }
		if (!$scope.role.view) $scope.role.view = false;

		$scope.addedRoles.push({'name': $scope.role.name,
			'description': $scope.role.description,
			'update': $scope.role.update,
			'view': $scope.role.view });

	};

	$scope.removeRole = function(removal) {
		
		for(var i = 0; i < $scope.addedRoles.length; i++) {
			if($scope.addedRoles[i].name == removal)
				$scope.addedRoles.splice(i, i + 1);
		}
	};

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
		var form = angular.toJson($scope.addedRoles);
		
		alert();
	};
	/*
	$scope.editRole = function() {
		alert('editing');
	}*/
});
