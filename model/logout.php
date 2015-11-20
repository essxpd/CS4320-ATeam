<?php
        session_start();
		$sso = $_SESSION["SSO"];
		
        session_unset();#unset session variable
        session_destroy();#destroy the session so user is no longer logged in
		//stuff for logging -------------------------------
		require("dbconnect.php");
		$sql = "INSERT INTO testAuth.log (SSO,Action) VALUES ('" . $sso . "','logout')";
		if (mysqli_query($conn, $sql)) {
			echo "New log entry created successfully";
			} else {
				echo "Error: " . $sql . "<br>" . mysqli_error($conn);
				}


			echo " -" .$action;
		
		//end of stuff for logging ----------------------
		
        $url = 'http://';
        $url .= $_SERVER['SERVER_NAME'];
        $url .= $_SERVER['REQUEST_URI'];
        $loc = dirname(dirname($url));
        $loc .= '/login.php';

        header('Location: ' . $loc);

?>
