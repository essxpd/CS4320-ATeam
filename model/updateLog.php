<?PHP
	require("dbconnect.php");
	$action = $_POST['action'];
	$SSO = $_POST['sso'];
	$sql = "INSERT INTO testAuth.log (SSO,Action) VALUES ('" . $SSO . "','" . $action . "')";
	if (mysqli_query($conn, $sql)) {
		echo "New log entry created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . mysqli_error($conn);
			}
	

	echo " -" .$action;
?>