<?php
        session_start();
#        if(!$_SERVER['HTTPS'])
#                header("Location: https://a-team.cloudapp.net/CS4320-ATeam/model/login.php");
        if (!isset($_SESSION['loggedIn']))#check is user is logged in or not, it now redirect to login page
                header("Location: http://a-team.cloudapp.net/testProject/CS4320-ATeam/login.php");
#               will need to change testProject to Project before deployment

        session_unset();#unset session variable
        session_destroy();#destroy the session so user is no longer logged in

        header("Location: http://a-team.cloudapp.net/testProject/CS4320-ATeam/login.php");#redirect to login page

?>
