<!DOCTYPE html>
<?php
    session_start();
    //if(!$_SERVER['HTTPS'])
    //    header("Location: https://a-team.cloudapp.net/Cody/CS4320-ATeam/index.php");
    if (!isset($_SESSION['loggedIn'])){
        $host  = $_SERVER['HTTP_HOST'];
        $uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
        $extra = 'login.php';
        header("Location: http://$host$uri/$extra");
    }
?>
<html>
<head>
  <meta charset="utf-8">
  <title>CS4320 A-Team Project</title>
  <meta name="viewport" content="width=device-width">

  <!-- Main Style Sheet -->
  <link rel="stylesheet" href="styles/main.css">

  <!-- Get AngularJS -->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
  <!-- Get Angular ngRoute -->
  <script src="https://code.angularjs.org/1.4.7/angular-route.min.js"></script>
  <!-- Get Angular ngSanitize -->
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-sanitize.js"></script>

  <script src="scripts/app.js"></script>
  <script src="scripts/controllers/main.js"></script>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

  <!-- Get Form builder -->
  <link rel="stylesheet" href="plugins/FormBuilder/vendor/css/vendor.css">
  <link rel="stylesheet" href="plugins/FormBuilder/dist/formbuilder.css">
  <script src="plugins/FormBuilder/vendor/js/vendor.js"></script>
  <script src="plugins/FormBuilder/dist/formbuilder.js"></script>
  
  <!-- Style Sheets -->
  <!-- Main Style Sheet -->
  <link rel="stylesheet" href="styles/main.css">  
  <!-- Applicant Style Sheet -->
  <link rel="stylesheet" href="styles/applicant.css">
  <!-- Form Style Sheet -->
  <link rel="stylesheet" href="styles/form.css">

</head>
    
<body ng-app="cs4320aTeamApp">
    <header>
        <div class="container">
            <div class="jumbotron">
                <h1>Student Information Systems</h1>
                <h2>Security Access Request Form</h2>
            </div>
        </div>
    </header>
	<div ng-view></div>
    <footer>
        <div class="container">
            Created by the A-Team
        </div>
        <div class="logout"><a href="./model/logout.php"><b>LOGOUT</a></div>
    </footer>
</body>

</html>
