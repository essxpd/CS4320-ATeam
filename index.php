<!DOCTYPE html>
<?php
    session_start();
    //if(!$_SERVER['HTTPS'])
    //    header("Location: https://a-team.cloudapp.net/Cody/CS4320-ATeam/index.php");
    $host  = $_SERVER['HTTP_HOST'];
    $uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
    if (!isset($_SESSION['loggedIn'])){
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
 
  <!-- jQuery Cookie -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-dateFormat/1.0/jquery.dateFormat.min.js"></script>
   
    <!-- Style Sheet For Accordion -->  
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.14.3/ui-bootstrap-tpls.min.js"></script>
  
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
            <div class="jumbotron">
                <div class="animated fadeInDown">
                    <h1 id="headertitle">STUDENT INFORMATION SYSTEMS</h1>
                    <h1 id="headerdesc">SECURITY ACCESS REQUEST FORM</h1>
                </div>    
            </div>
    </header>
    
    <div id="content">
	<div ng-view></div>
    </div>
        
    <div id="footer">
    <p class="credits" onmouseover="PlaySound('yallreadyforthis')" 
    onmouseout="StopSound('yallreadyforthis')">&copy; 2015 CS4320's A-Team</p>
    </div>
    
    <audio id='yallreadyforthis' src='styles/spacejam.ogg'/>
    
    <script type="text/javascript">
function PlaySound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.play();
}

function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}
</script>

</body>

</html>
