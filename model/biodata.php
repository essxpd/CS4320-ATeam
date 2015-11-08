<?PHP
require("dbconnect.php");
$SSO = 102;//change 100 to whatever the sso of the signed in user is however you like
//$SSO = $_POST["SSO"];
$sql = "SELECT * FROM testAuth.users WHERE sso = " . $SSO;
$result = mysqli_query($conn, $sql);

if ((mysqli_num_rows($result)) > 0) {//making sure something was found
	$row = mysqli_fetch_assoc($result);
	//puts all biodata into an array
	$arr = array('Full_Name' => $row["Full_Name"], 'Title' => $row["Title"], 'Department' => $row["Department"], 'SSO' => $row["SSO"], 'Employee_ID' => $row["Employee_ID"],
			'Campus_Address' => $row["Campus_Address"], 'Phone_Number' => $row["Phone_Number"], 'Ferpa_Score' => $row["Ferpa_Score"], 'User_Type' => $row["User_Type"]);
	//puts array into json object
	$BioData = json_encode($arr);
	$_SESSION['BioData'] = $arr;//send this wherever you want
	//echo $BioData;
	//echo $arr["Full_Name"];
	//echo $_SESSION['BioData'];
	echo "<div><h4>Full name: " . $arr["Full_Name"] . ".</h4>";
	echo "<h4>SSO: " . $arr["SSO"] . ".</h4>";	
	echo "<h4>Title: " . $arr["Title"] . ".</h4>";
	echo "<h4>Department: " . $arr["Department"] . ".</h4>";
	echo "<h4>Employee ID: " . $arr["Employee_ID"] . ".</h4>";
	echo "<h4>Campus Address: " . $arr["Campus_Address"] . ".</h4>";
	echo "<h4>Phone Number: " . $arr["Phone_Number"] . ".</h4>";
	echo "<h4>Ferpa Score: " . $arr["Ferpa_Score"] . ".</h4>";
	echo "<h4>User Type: " . $arr["User_Type"] . ".</h4>";
	
	
	
} else {//error message change to whatever you want
	echo "0 results";
}
?>