<?php
    session_start();
    //if(!$_SERVER['HTTPS'])
    //    header("Location: https://a-team.cloudapp.net/Cody/CS4320-ATeam/index.php");
    $host  = $_SERVER['HTTP_HOST'];
    $uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
    if (!isset($_SESSION["loggedIn"])){
        $extra = 'login.php';
        header("Location: http://$host$uri/$extra");
    }
    else if($_SESSION["loggedIn"] == 1)
    {
    	header("Location: http://$host$uri/#/");
    	header("Location: http://$host$uri/#/");

    }
    else if($_SESSION["loggedIn"] == 3)
    {
    	header("Location: http://$host$uri/#/admin");
    	header("Location: http://$host$uri/#/admin");

    }	
?>
            <div class="usercontainer">
  <div class="userinfo">
    <h4>Hello, <b>{{loggedInUser.Full_Name}}!</b><br>
    <small>Your current FERPA score is <b>{{loggedInUser.Ferpa_Score}}.</b></small></h4>
      
      <p>You are currently viewing our employer page!</p>
      
      <p>Other functionality stuff can go here, in the event that we discover something else we'd like to add for navigation purposes.</p>
      
    <h4 class="logout">
        <a href="./model/logout.php"><b>LOGOUT</b></a>
        </h4>
        </div></div>


<div id="pagecontainer">

<div class="container">
        <h3>User: {{loggedInUser.Full_Name}}</h3>
        <h4>Department: {{loggedInUser.Department}}</h4>
        <br>
        <!--Previous Submissions-->
        
    <div id="container">
  <div ng-app="accordion" class="accordion-test">

  <uib-accordion>
    
    <uib-accordion-group>
      
        <uib-accordion-heading>
            Forms Listed by Date Submitted <i class="pull-right glyphicon" ng-class="{'glyphicon-chevron-down': isopen, 'glyphicon-chevron-right': !isopen}"></i>
        </uib-accordion-heading>

        <table class="table">
            <thead>
                <tr>
                    <th>Forms Listed By Date Submitted</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="form in deptForms | orderBy: '-date'">
                    <td><a ng-click="mongoForm(form._id, form.date)">{{form.name}} | {{form.date}}</a></td>
            		<!--<input type="button" class="btn btn-primary" ng-click="editForm(forms.id)" value="Edit">
					-->
					<td>                	
						<input type="button" class="btn btn-approve" ng-click="approveForm(forms.id)" value="Approve">
					</td>
					<td>
						<input type="button" class="btn btn-danger" ng-click="removeForm(forms.id)" value="Remove">
					</td>

                </tr>

            </tbody>
        </table>

    </uib-accordion-group>
  
  </uib-accordion>
</div>
    </div>
        
</div>
</div>
