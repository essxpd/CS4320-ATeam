<?php
        session_start();
#        if(!$_SERVER['HTTPS'])
#                header("Location: https://a-team.cloudapp.net/Jeremy/CS4320-ATeam/model/login.php");
        if (!isset($_SESSION['count']))
                header("Location: http://a-team.cloudapp.net/Jeremy/CS4320-ATeam/login.php");

        session_unset();
        session_destroy();

        header("Location: http://a-team.cloudapp.net/Jeremy/CS4320-ATeam/login.php");

?>
