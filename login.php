<!DOCTYPE html>
<?php
    session_start();
    //if(!$_SERVER['HTTPS'])
    //        header("Location: https://a-team.cloudapp.net/Cody/CS4320-ATeam/login.php");
    if (isset($_SESSION['loggedIn'])){
            $host  = $_SERVER['HTTP_HOST'];
            $uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
            header("Location: http://$host$uri/");
    }
?>
<html>
<head>
  <meta charset="utf-8">
  <title>CS4320 A-Team Login</title>
  <meta name="viewport" content="width=device-width">
    
    <!-- Bootstrap CSS -->
      
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

  <!-- Main Style Sheet -->
  <link rel="stylesheet" href="styles/main.css">
    
    <!-- Login Style Sheet -->
    <link rel="stylesheet" href="styles/login.css">

  <!-- Get AngularJS -->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
  <!-- Get Angular ngRoute -->
  <script src="https://code.angularjs.org/1.4.7/angular-route.min.js"></script>
  <!-- Get Angular ngSanitize -->
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-sanitize.js"></script>

  <script src="scripts/app.js"></script>
  <script src="scripts/controllers/main.js"></script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

  
</head>
    
<div id="logincontainer">    
    
    <h1>Welcome to the Electronic SiS Security Form!</h1>
    <h2>Please login below:</h2>
    <div id="login">
        <div class="formwrap">
            <form action="model/auth.php" method="post">
                <input type="text" id="username" placeholder="Username" name="username">
                <br>
                <input type="password" id="password" placeholder="Password" name="password">
                <button id="login-button">LOGIN</button>
            </form>
        </div>
    <!--	<p>{{$scope.errorMsg}}</p>
    -->
    </div>
</div>	
</body>

</html>
