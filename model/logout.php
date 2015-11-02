<?php
        session_start();
#        if(!$_SERVER['HTTPS'])
#                header("Location: https://a-team.cloudapp.net/CS4320-ATeam/model/login.php");
        if (!isset($_SESSION['loggedIn']))
                header("Location: http://a-team.cloudapp.net/testProject/CS4320-ATeam/login.php");

        session_unset();
        session_destroy();

        header("Location: http://a-team.cloudapp.net/testProject/CS4320-ATeam/login.php");

?>
