<?php
    session_start();
    //if(!$_SERVER['HTTPS'])
    //    header("Location: https://a-team.cloudapp.net/Cody/CS4320-ATeam/index.php");
    $host  = $_SERVER['HTTP_HOST'];
    $uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
    if (!isset($_SESSION['loggedIn']))
    {
        $extra = 'login.php';
        header("Location: http://$host$uri/$extra");
    }
    else if($_SESSION["loggedIn"] == 2)
    {
    	header("Location: http://$host$uri/#/employer");
    }
    else if($_SESSION["loggedIn"] == 1)
    {
    	header("Location: http://$host$uri/#/");
    }	
?>
            <div class="usercontainer">
  <div class="userinfo">
    <h4>Hello, <b>{{loggedInUser.Full_Name}}!</b><br>
    <small>Your current FERPA score is <b>{{loggedInUser.Ferpa_Score}}.</b></small></h4>
      
      <p>You are currently viewing our admin page!</p>
      
      <p>Other functionality stuff can go here, in the event that we discover something else we'd like to add for navigation purposes.</p>
      
    <h4 class="logout">
        <a href="./model/logout.php"><b>LOGOUT</b></a>
        </h4>
        </div></div>


<div id="pagecontainer">
    
    <div class="container">
        <h3>Welcome, {{loggedInUser.Full_Name}}!</h3>
        <br>
        <!--Previous Submissions-->
	<div ng-app="accordion" class="accordion-test">
		<uib-accordion>
			<uib-accordion-group>
				<uib-accordion-heading>
					Current Forms <i class="pull-right glyphicon" ng-class="{'glyphicon-chevron-down': isopen, 'glyphicon-chevron-right': !isopen}"></i>
				</uib-accordion-heading>
				<table class="table">
					<thead>
						<tr>
							<th>Application</th>
							<th>Form</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="forms in createdForms | orderBy: '+application'">
							<td>{{forms.application}}</td>
							<td>{{forms.name}}</td>
							<td><input type="button" class="btn btn-primary" ng-click="editForm(forms.id)" value="Edit">
							<input type="button" class="btn btn-danger" ng-click="removeForm(forms.id)" value="Remove"></td>

						</tr>
					</tbody>
				</table>
			</uib-accordion-group>
		</uib-accordion>
	</div>
	<br>
	<hr>
	<div id="container">
		<h2>Search Submitted Forms</h2>
		<form>
			<input type="text" name="user" ng-model="search" required>
			<button class="btn btn-primary" ng-click="findallforms(search)">Search</button>
		</form>
		
        <table class="table">
            <thead>
                <tr>
                    <th>Forms Listed By Date Submitted</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="form in allForms">
                    <td><a ng-click="mongoForm(form._id, form.date)">{{form.date}}</a></td>
                   <!-- <td><button class="btn btn-primary" ng-click="mongoForm(form._id)">View</button></td> -->
                </tr>
            </tbody>
        </table>
    </div>
        <!--Instruction Set-->
        <div class="center-block">
                <br>
		<h4>Instructions: </h4>
                <p>Instructions to create new forms...</p>
                <br>
                <br>
                <input type="button" class="btn btn-default btn-lg" ng-click="createForm()" value="Create new form">
        </div>
        <br>
        <br>
    </div></div>
