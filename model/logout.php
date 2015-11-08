<?php
        session_start();
        session_unset();#unset session variable
        session_destroy();#destroy the session so user is no longer logged in

        $url = 'http://';
        $url .= $_SERVER['SERVER_NAME'];
        $url .= $_SERVER['REQUEST_URI'];
        $loc = dirname(dirname($url));
        $loc .= '/login.php';

        header('Location: ' . $loc);

?>
