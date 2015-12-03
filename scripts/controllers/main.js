angular.module('cs4320aTeamApp')
    .controller('MainCtrl', function($scope, $location, $http, $window, $sanitize, $timeout, data){
	/*Variables for the users role */
	$scope.isopen = false;
	$scope.role = "";
	$scope.role.update = false;
	$scope.role.view = false;
	$scope.roleNames = [];
	$scope.form = "";
	$scope.addedRoles = [];
	$scope.toggle = false;

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
	/*This function adds information to the log on the mysql database*/
    function logging(action) {
		//creates a javascript object to send to the updateLog script
		var postData = {
			action: action,
			sso: $scope.loggedInUser.SSO
		}
		//ajax call to updateLog with the postData information
		$.post("./model/updateLog.php", postData, function(response) {
			console.log(response);
		});
		
	}
	/*function to detect given paths; if a certain url matches a given parameter then an ajax request is fired off to a given page and refreshes with the data returned*/
    function refresh(userType){
        //if the user is a user then refresh the data given their pawprint
        if($scope.loggedInUser && userType == 'user'){
            $http.get('./model/mongoFindAll.php?paw=' + $scope.loggedInUser.SSO).then(function(response){
                $scope.prevForms = response.data;
            });
        }
		//if the user is an admin then get admin data from mongoDB
        if($scope.loggedInUser.User_Type == 'admin' && userType == 'admin'){
            $http.get('./model/mongoFindAll.php?req=admin').then(function(response){
                $scope.adminForms = response.data;
            });
        }
		//if the user is an employer then refresh the page given a department
        if($scope.loggedInUser.User_Type == 'employer' && userType == 'employer')
        {
            $http.get('./model/mongoFindAll.php?dept=' + $scope.loggedInUser.Department).then(function(response){
                $scope.deptForms = response.data;
            });
        }
    }
    
    /*
	if($scope.loggedInUser.User_Type == 'employer')
	{
		$http.get('./model/mongoScript.php?department=' + $scope.loggedInUser.Department).then(function(response){
			$scope.deptForms = response.data;
		});
	}
    */
	/*This function generate a PDF given a certain amount of data*/
   $scope.mongoForm = function(id, date){
		var absUrl = $location.absUrl();
		var path = $location.path();
		var str = "#" + path;
		str = new RegExp(str, "g");
		var locStr = absUrl.replace(str, "");
		//var strToReplace = new RegExp(str, "g");
		//var htmlToPass = $scope.getSecurityRequestBoxes(date);
		//calls the getSecurityRequestBoxes function to get all of the requested security levels and if it has been approved or not
		$scope.getSecurityRequestBoxes(date, id, locStr);
		//console.log("getting html");
		//console.log(htmlToPass);
		//console.log($scope.senthtmlobject);
		/*angular.forEach(id, function(value, key){
			var newLoc;
			newLoc = locStr + "model/makePDF.php?" + value + "&htmlObject=" + htmlToPass;
			$window.location.href = newLoc;
		})*/
	};
    /*This function refreshes the scope variables for the user, finduserbio gets all of the currently logged in user bio data and sets the bio scope variable equal to it
		then the mongofindall call refreshes the submitted form list
	*/
   $scope.findallforms = function(){
	    $http.get('./model/finduserbio.php?paw=' + $scope.search).then(function(response){
		$scope.userBio = response.data;
		});
		$http.get('./model/mongoFindAll.php?paw=' + $scope.search).then(function(response){
		$scope.allForms = response.data;
	});
   };
	//returns the user to the home screen - home screen is dependent on the user type
	function goToHome(){
		$location.path('/');
	}
	//if the current path regex is empty then refresh for a user
    if($scope.currentPath === '/'){
        refresh('user');
    }
    //if the current path regex is admin then refresh for an admin
    if($scope.currentPath === '/admin'){
        refresh('admin');
    }
    //if the current path regex is employer then refresh for an employer
    if($scope.currentPath === '/employer'){
        refresh('employer');
    }
	//scope variable for groups
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
	//scope function for downloading a given form
	$scope.downloadCreatedForm = function(id) {
	    $window.alert("You just tried to download form " + id + "!");
	};
	
	//On click, changes url to root/form, triggering a view change
	$scope.goToForm = function(){
		$location.path('/form');
	};
	
	// Redirects to users home
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
		logging('edited form ' + id);
		//$location.path('/createForm');
		//utilizes jQuery cookies for editing forms
		$.cookie("edit", id);
		$location.path('/createForm');
	};

	// Will remove the form given a form id
	$scope.removeForm = function(id) {
		logging('removed form ' + id);
		var $response = $window.confirm("Are you sure you would like to remove this form?");
		if($response) {
			//$window.alert("You just tried to delete form " + id + "!");
			//fires off an ajax post request to the removeForm script, queries by id
			//if the request is successful then it reloads the page to cease showing the form, else it throws an error
			$.ajax({
				type: "POST",
				url: './model/removeForm.php',
				data: {id: id},
				dataType: "text",
				success: function(response) {
					console.log(response);
					$window.location.reload();
				},
				error: function(errorThrown){
					console.log(errorThrown);
				}
			});	
	    	}
	};
    // Will approve a form given an id and a user type, queries to mongoFindOne, a successful response reloads the page
    $scope.approveForm = function(id, userType){
        $.ajax({
			type: "POST",
			url: './model/mongoFindOne.php',
			data: {id: id, userType: userType},
			success: function(response){
                $window.location.reload();
            }
        });
    }
    
    $scope.rejectForm = function(id){
        $.ajax({
            type: "POST",
            url: './model/mongoFindOne.php',
            data: {id: id, action: "reject"},
            success: function(response){
                $window.location.reload();
            }
        });    
    }

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
            
	//Working Security Questions - this is linked to the dropdown list on the form page in the views
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
	//this function sets the status of the view and update checkboxes, the extra logic was necessary to avoid values being added to the object list multiple time
	$scope.setStatusOfCheckBox = function(status, question){
		//console.log(status);
		//console.log(question);
		//console.log(level);
		//if the status is already in the array then splice it out      else add it to the list
		if(question.selectedStatus.indexOf(status) > -1){
			question.selectedStatus.splice(question.selectedStatus.indexOf(status), 1);
		}else{
			question.selectedStatus.push(status);
		}
		//$scope.getSecurityRequestBoxes();
		//console.dir($scope.securityLevels);
	};
	//this function parses through the securityLevels scope variable
	/* it takes in a date, an id and a location string */
	$scope.getSecurityRequestBoxes = function(date, id, locStr){
		/*fires off an ajax request to the mongoScript script to get the data from a 
		certain date time string (this may change in the future; logically it is just 
		improbable for two forms to have been submitted simultaneously and almost impossible 
		for a server to execute two things simultaneously)*/
		$.ajax({
			type: "GET",
			url: './model/mongoScript.php',
			data: {date : date},
			dataType: "JSON",
			success: function(response){
				//on success begin parsing out th response
                for(var key in response){
                var information = response[key];
                var secLevels = information.securityLevels;
                var copySec = information.copySecurityRequest;
				//if the user copied another user then print out that users bio data
                if(copySec){
					var htmlObject = "";
					//console.log(information);
					//console.log(copySec);
					//console.log(information.isApprovedByAdmin);
					//if the user was approved by the employer then show that, else do not show that
                    if(information.isRejected == "true"){
                        htmlObject = htmlObject + "<p><b>Your form has been rejected.</b></p>";
                    }
                    else{
                        if(information.isApprovedByEmployer == "true"){
                            htmlObject = htmlObject + "<p><b>Your Employer has approved your form!</b></p>";
                        }
                        else{
                            htmlObject = htmlObject + "<p><b>Your Employer has not yet approved your form.</b></p>";	
                        }
                        //if the user was approved by the admin then show that, else do not show that
                        if(information.isApprovedByAdmin == "true"){
                            htmlObject = htmlObject + "<p><b>Administrative staff have approved your form!</b></p>";						
                        }else{
                            htmlObject = htmlObject + "<p><b>Administrative staff have not yet approved your form!</b></p>";	
                        }
                        
                    }
					htmlObject = htmlObject + "<hr>";
                    htmlObject = htmlObject + "<p><h4>Copy Security Request</h4></p>";
                    angular.forEach(copySec, function(value, key){
                        angular.forEach(value, function(v, k){
                            if(k == "isCurrentEmployee"){
                                htmlObject = htmlObject + "<p>Copy Security for CURRENT Employee</p><ul>";
                            }
                            else if(k == "isFormerEmployee"){
                                htmlObject = htmlObject + "<p>Copy Security for FORMER Employee</p><ul>";
                            }
                            else{
                                htmlObject = htmlObject + "<li>" + k + ": " + v + "</li>";
                            }
                        });    
                    });
					htmlObject = htmlObject + "</ul>";
                }
				//else if the user created a new submissions for themselves then parse through everything
                else{
                    var htmlObject = "";
					//if the user was approved by the employer then show that, else do not show that
					if(information.isRejected == "true"){
                        htmlObject = htmlObject + "<p><b>Your form has been rejected.</b></p>";
                    }
                    else{
                        if(information.isApprovedByEmployer == "true"){
                            htmlObject = htmlObject + "<p><b>Your Employer has approved your form!</b></p>";
                        }
                        else{
                            htmlObject = htmlObject + "<p><b>Your Employer has not yet approved your form.</b></p>";	
                        }
                        //if the user was approved by the admin then show that, else do not show that
                        if(information.isApprovedByAdmin == "true"){
                            htmlObject = htmlObject + "<p><b>Administrative staff have approved your form!</b></p>";						
                        }else{
                            htmlObject = htmlObject + "<p><b>Administrative staff have not yet approved your form!</b></p>";	
                        }
                        
                    }
					htmlObject = htmlObject + "<hr>";
                    var instanceCounter;
					//for every security level get the security states and all requested statuses
                    for(var key in secLevels){
                        instanceCounter = 0;
                        var level = secLevels[key];
                       // console.log(level);
                        for (var key2 in level.questionsArr) {
                            var question = level.questionsArr[key2];
                            if(question.selectedStatus != undefined){
                                if(question.selectedStatus.length > 0){
                                    //console.log("we in it");
                                    if (instanceCounter == 0) {
                                        htmlObject = htmlObject + "<h4>Requested security states from " + level.type + "</h4><ul>";
                                    }
                                    htmlObject = htmlObject + "<li>For " + question.number + " level : Requesting ";
                                    for (var key3 in question.selectedStatus) {
                                        var status = question.selectedStatus[key3];
                                        if(question.selectedStatus.length == 2){
                                            if (key3 == 0) {
                                                htmlObject = htmlObject + status + ", and ";
                                            } else {
                                                htmlObject = htmlObject + status;
                                            }
                                        }else{
                                            htmlObject = htmlObject + status;
                                        }
                                    }
                                    htmlObject = htmlObject + " permissions.</li>";
                                    ++instanceCounter;
                                }
                            }
                        }
						htmlObject = htmlObject + "</ul>";
                    }
                }
                }
				//appends data to a get request to get a new form - this was done so the form could be shared, its ugly, but it works well
                angular.forEach(id, function(value, key){
                    var newLoc;
                    newLoc = locStr + "model/makePDF.php?" + value + "&htmlObject=" + htmlObject;
                    $window.location.href = newLoc;

                });
        }});
	};
            
	
	// To submit security level request data
	$scope.saveRequest = function(){
		logging('form submitted');
		//Error Message if fields haven't been entered.
		$scope.saveError = "";

        //var shortDateFormat = 'yyyy-MM-dd HH:mm:ss';
		//var date = jQuery.format.date(new Date(), shortDateFormat);
        var date = new Date();
        
		//JSON obj to be pushed to mongo
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
            "isApprovedByAdmin": false,
            "isApprovedByEmployer": false,
            "isRejected": false,
			"securityLevels" : $scope.securityLevels
		};

		console.dir(newData);

		//Replace securityLevels with the information from copySecurity if they've elected to do that instead.
		if($scope.toggle === true){ //If copySecurity was selected,
			//Fill in copySecurity array with text input. ToDo: Sanitize
			$scope.copySecurity = [
                {"isCurrentEmployee": $scope.currentEmpCopy},
                {"isFormerEmployee": $scope.formerEmpCopy},
				{"name": $scope.copySecurity.empName},
				{"position": $scope.copySecurity.empPosition},
				{"pawprint": $scope.copySecurity.empPawprint},
				{"empId": $scope.copySecurity.empId}
			];
			//maintain scope
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
                "isApprovedByAdmin": false,
                "isApprovedByEmployer": false,
                "isRejected": false,
                "copySecurityRequest" : $scope.copySecurity
            };

		}

		//If type of request hasn't been specified, change error msg to what's below and return.
		if(!$scope.requestType){
			$scope.saveError = "Please choose which type of request you would like to make.";
			return;
		}
		//sets the error scope variable if the user did not fill out the request type
		if(!$scope.explainRequest){
			$scope.saveError = "Please describe the type of access needed in the large space provided.";
			return;
		}

		// Inserts data into mongo, Temp notifies you in console when success - fires a post type ajax, on success refresh for a user and go home
		$.ajax({
			type: "POST",
			url: './model/mongoScript.php',
			data: {data : newData},
			success: function(){
				refresh('user');
				goToHome();
			},
			error: function(errorThrown){$scope.saveError = errorThrown;}
		});
	};
	//iff is current path is form then fire off a get request to applications.php, on success push the data to the applications scope variable and apply it
	if($scope.currentPath == "/form")
	{
		$scope.applications = [];
		
                $.ajax({
                    url: './model/applications.php',
                    type: 'GET',
                    dataType: 'json',
                    success: function(data){
                        $scope.$apply(function() {
                                $.each(data, function(key, value){
                                        $scope.applications.push({'name': value.name});
					if(value.name == "MyZou")
						$scope.requestApplication = "MyZou";
				
                                });
				loadForm($scope.requestApplication);
                        });
                    }
                });
                
	}
	//a scope function if the applicant changed then load the form
	$scope.appChanged = function(app) {
		//	console.log('test');
		loadForm(app)
	};
	//non scope function load 
	function loadForm(app) {
		//fires off an ajax get request to the form_templates file, on success apply data to the scope securityLevels variable
		$.ajax({
                    url: './model/form_templates.php',
                    type: 'GET',
		    data: {app: app},
                    dataType: 'json',
                    success: function(data){
                        $scope.$apply(function() {
				temp = [];
				$.each(data, function(id, value) {
					questionsArr = [];
					$.each(value.roles, function(role_key, role) {
						questions = [];
						selectedStatus = [];
						stat = [];
						if(role.view == 'true')
							stat.push('view');
						if(role.update == 'true')
							stat.push('update');

						questions.push({'question': role.description, 'status': stat});
						questionsArr.push({'number': role.name, 'questions': questions, 'selectedStatus': selectedStatus});
					});
					temp.push({'type': value.name, 'questionsArr': questionsArr});
				});
				$scope.securityLevels = temp;
                        });
                    }
                });
		
	}

	//if the scope currentPath variable is admin then..
	if($scope.currentPath == "/admin")
        {
				//fire off an ajax request to the newForms.php script and on success apply to the scope the change in createdFroms list
                $scope.createdForms = [];
                $.ajax({
                    url: './model/newForms.php',
                    type: 'GET',
                    dataType: 'json',
                    success: function(data){
                        $scope.$apply(function() {
                                $.each(data, function(key, value){
                                        $scope.createdForms.push({'application': value.application, 'id': key, 'name': value.name, 'roles': value.roles});
                                });
                        });
                    }
                });
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
				//if saveError then return an empty string 
                if($scope.saveError)
                        return "";

                if(!$scope.role.update)
                        $scope.role.update = false;
                if(!$scope.role.view)
                        $scope.role.view = false;

				//push up role info into the addedRoles variable
                $scope.addedRoles.push({'name': $scope.role.name,
                                        'description': $scope.role.description,
                                        'update': $scope.role.update,
                                        'view': $scope.role.view });
                console.log($scope.role.view);
		$scope.role.name = "";
		$scope.role.description = "";
		$scope.role.update = false;
		$scope.role.view = false;
		$('#roleName').focus();
	};
	//scope function to remove a role
	$scope.removeRole = function(removal) {
		//given an index search inside the addedRoles array, if the name is removal then change the index
		var index;
		for(var i = 0; i < $scope.addedRoles.length; i++) {
			if($scope.addedRoles[i].name == removal) {
				index = i;
			}
		}
		console.log(index);
		//splice the given index out of the addedRoles scope variable
		$scope.addedRoles.splice(index, 1);
	};
	//if the currentPath is createForm
	if($scope.currentPath == '/createForm')
        {
			//fire an ajax get request off to applications.php script, on success apply changes to the scope, pushes names to the websites scope variable
                $scope.websites = [];
                $.ajax({
                    url: './model/applications.php',
                    type: 'GET',
                    dataType: 'json',
                    success: function(data){
                        $scope.$apply(function() {
                                $.each(data, function(key, value){
                                        $scope.websites.push({'name': value.name});
                                        //$scope.createdForms.push({'id': key, 'name': value[0].name, 'roles': value[0].roles});
                                });
		// Check if there is an edit cookie set
		$scope.edit = $.cookie('edit');
		$.removeCookie('edit');
		// If there is then load in all edit data
		if($scope.edit)
		{
			//fires off an ajax get request to the form_templates script, on success applies scope changes to the form scope variable
			$.ajax({
			    url: './model/form_templates.php',
			    type: 'GET',
			    data: {'id': $scope.edit},
			    dataType: 'json',
			    success: function(d){
				$scope.$apply(function() {
					console.dir(d);
					$.each(d, function(k, v) {
						$scope.form = [];
						//for each object in websites if the name is equal to the v name then id_app variable is equal to the index
						for(var i = 0; i < $scope.websites.length; i++) 
						{
							if($scope.websites[i].name == v.application)
								$scope.id_app = i;
						}
						
						$scope.form.application = $scope.websites[$scope.id_app];
						//form sets form and addedRoles equal to those of the v variable
						$scope.form.name = v.name;
						$scope.addedRoles = v.roles.slice();
						for(var i = 0; i < $scope.addedRoles.length; i++)
						{
							$scope.addedRoles[i].update = (v.roles[i].update == 'true');
							$scope.addedRoles[i].view = (v.roles[i].view == 'true');
						}
					});
				});
			    }
			});
		}

                        });
                    }
                });
        }
	//scope function to submit created forms
	$scope.submitCreatedForm = function() {
		 logging('form created');
		 $scope.submitError = "";
				//if not application then submit an error
                if(!$scope.form.application) {
                        $scope.submitError = "Choose an application.";
                        return;
                }
		//if application.name then set it equal to application
		if($scope.form.application.name) {
			$scope.form.application = $scope.form.application.name;
		}
				//if not form.name then submit an error
                if(!$scope.form.name) {
                        $scope.submitError = "Insert form name.";
                        return;
                }
				//if addedRoles.length is less than 1 then submiterror
                if($scope.addedRoles.length < 1) {
                        $scope.submitError = "Atleast one security role must be added.";
                        return;
                }

                // Submit the packaged form data to mongo
                var formData = {"application": $scope.form.application , "name": $scope.form.name, "roles": $scope.addedRoles};

		if($scope.edit)
		{	// Update - -fires off an ajax post request to updateForm script, on success just log out the response, there is no data to retrieve
			$.ajax({
				type: "POST",
				url: './model/updateForm.php',
				datatype: 'JSON',
				data: {data : formData, id : $scope.edit},
				success: function(data){console.log(data);},
				error: function(errorThrown){$scope.saveError = errorThrown;}
			});
		}
		else
		{	// Insert - - fires off an ajax post request to the newForms script, on success log out the data, similar as before
			$.ajax({
				type: "POST",
				url: './model/newForms.php',
				data: {data : formData},
				success: function(data){console.log(data);},
				error: function(errorThrown){$scope.saveError = errorThrown;}
			});
		}
				//set location path to admin
                $location.path('/admin');

	};
});
