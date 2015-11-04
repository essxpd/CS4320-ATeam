<?php
require("dbconnect.php");
                $user = htmlspecialchars($_POST['username']);
                $pw = htmlspecialchars($_POST['password']);
#                echo "<br>".$user;
#                echo "<br>".$pw;
#               echo"<br> heading to first if";
#				$user = "100";
				$query1 = "SELECT Salt, Password_Hash FROM authentication WHERE SSO = ". $user;
                echo "<br>".$query1."<br>";
				$result = mysqli_query($conn, $query1) or die('Getting salt and password_hash failed: '.mysqli_error());;
                
				echo "<br> made it to begining of first if";
				$row1 = mysqli_fetch_assoc($result);
				$localhash = sha1($row1['Salt'].$pw);
				$result->close();
#	               	echo "<br> made it to end of first if";

#                echo "<br>heading to second if";

				$query2 = "SELECT User_Type FROM users WHERE SSO = ".$user;
				$result2 = mysqli_query($conn, $query2) or die('Getting user_type failed: '.mysqli_error());
				$row2 = $result2->fetch_assoc();
				$user_type = $row2['User_Type'];
				$result2->close();
#                	echo "<br> Made it to second if";
                
                $_SESSION["SSO"] = $user;

                if ($localhash == $row1['Password_Hash'])
                {
                        echo 'You logged in!';
						if($user_type == 'administrator')
							$_SESSION["loggedIn"] = 3;//SiS admin people
						elseif ($user_type == 'employer')
							$_SESSION["loggedIn"] = 2;
						else
							$_SESSION["loggedIn"] =1;//for applicants
						$_SESSION["User_Type"] = $user_type;
                }
                else
                        exit("Invalid login credentials");

            	if($result3 = $conn->query("SELECT * FROM users WHERE SSO = ".$user)){
                	$row3 = $result3->fetch_assoc();
                	$full_name = $row3["Full_Name"];
                	$pieces = explode(" ", $full_name);
                	$first_name = $pieces[0];
                	$last_name = $pieces[1];     	
                	$result3->close();
#                	echo "<br> Made it to second if";
                }
                else
                	exit("Error getting User_Type: $mysqli->error");
                        
                $mysqli->close();
                header("Location: http://a-team.cloudapp.net/Jeremy/CS4320-ATeam/index.php");
                exit();
                        
?>

