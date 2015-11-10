<?PHP

	session_start();
	$SSO = 102;
	//$arr = $_SESSION['BioData'];
	require("dbconnect.php");
	$sql = "SELECT * FROM testAuth.users WHERE sso = " . $SSO;
	$result = mysqli_query($conn, $sql);

if ((mysqli_num_rows($result)) > 0) {//making sure something was found
    $row = mysqli_fetch_assoc($result);
    //puts all biodata into an array
    $arr = array('Full_Name' => $row["Full_Name"], 'Title' => $row["Title"], 'Department' => $row["Department"], 'SSO' => $row["SSO"], 'Employee_ID' => $row["Employee_ID"],
            'Campus_Address' => $row["Campus_Address"], 'Phone_Number' => $row["Phone_Number"], 'Ferpa_Score' => $row["Ferpa_Score"], 'User_Type' => $row["User_Type"]);
    
    
    
    
    
} else {//error message change to whatever you want
    echo "0 results";
}
	
	echo '
		<p>Name: ' . $arr['Full_Name'] . '.</p>
		<p>Title: ' . $arr['Title'] . '.</p>
		<p>Department: ' . $arr['Department'] . '.</p>
		<p>SSO: ' . $arr['SSO'] . '.</p>
		<p>Employee ID: ' . $arr['Employee_ID'] . '.</p>
		<p>Campus Address: ' . $arr['Campus_Address'] . '.</p>
		<p>Phone Number: ' . $arr['Phone_Number'] . '.</p>
		<p>Ferpa Score: ' . $arr['Ferpa_Score'] . '.</p>
		<h3>Previous submissions:</h3>
	';
if($scope.loggedInUser){
    $http.get('./model/mongoFindAll.php?paw=' + $scope.loggedInUser.SSO).then(function(response){
        $scope.prevForms = response.data;    
        });
    };
    
//Fix this for your version.
$scope.mongoForm = function(id){
	angular.forEach(id, function(value, key){
		$window.location.href = "http://a-team.cloudapp.net/Chris/CS4320-ATeam/model/makePDF.php?" + value;
	})
};
	
	
	
	
 echo '
	<tbody>
		<tr ng-repeat="form in prevForms">
			<td><a ng-click="mongoForm(form._id)">{{form.date}}</a></td>
			<!-- <td><button class="btn btn-primary" ng-click="mongoForm(form._id)">View</button></td> -->
		</tr>
	</tbody>
';
	
	
	
	
	
	
?>