<?php
//include("../secure/databaseAuth.php");
$servername = "localhost";
$username = "root";
$password = "Ateam4320";
// Create connection
$conn = mysqli_connect($servername,$username,$password);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
//echo "Connected successfully";




?>
