<!DOCTYPE html>
<?php
        session_start();
#        if(!$_SERVER['HTTPS'])
#                header("Location: https://a-team.cloudapp.net/testProject/CS4320-ATeam/login.php");
        if (isset($_SESSION['loggedIn']))
                header("Location: http://a-team.cloudapp.net/testProject/CS4320-ATeam/index.php");
?>
<html>
<head>
  <meta charset="utf-8">
  <title>CS4320 A-Team Login</title>
  <meta name="viewport" content="width=device-width">

  <!-- Main Style Sheet -->
  <link rel="stylesheet" href="styles/main.css">

  <!-- Get AngularJS -->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
  <!-- Get Angular ngRoute -->
  <script src="https://code.angularjs.org/1.4.7/angular-route.min.js"></script>

  <script src="scripts/app.js"></script>
  <script src="scripts/controllers/main.js"></script>
  
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

  
</head>

<body ng-app="cs4320aTeamApp" ng-controller="MainCtrl">
<div id="login">
	<form>
		Username:<br>
		<input type="text" ng-model="user.username">
		<br>
		Password:<br>
		<input type="password" ng-model="user.password">
		<br><br>
		<button ng-click="login()">Submit</button>
	</form>
	<p>{{$scope.errorMsg}}</p>
</div>
<script>
</script>	
</body>

</html>
