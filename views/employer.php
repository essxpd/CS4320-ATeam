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
      <h4>Hello, <b>{{loggedInUser.Full_Name}}!</b><br></h4>
        <h4><b class="navi" ng-click="goToHome()" style="cursor:pointer;">HOME</b> &nbsp; &nbsp; <a class="navi" href="./model/logout.php"><b>LOGOUT</b></a>
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
            Forms In Need of Approval <i class="pull-right glyphicon" ng-class="{'glyphicon-chevron-down': isopen, 'glyphicon-chevron-right': !isopen}"></i>
        </uib-accordion-heading>

        <table class="table">
            <thead>
                <tr>
                    <th>Forms Listed By Date Submitted</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="form in deptForms | orderBy:'-date'">
                    <td><a ng-click="mongoForm(form._id, form.date)">{{form.name}} | {{form.date}}</a></td>
                    <td><button type="button" ng-click="approveForm(form._id, 'employer')">Approve</button></td>
                    <td><button type="button" ng-click="rejectForm(form._id)">Reject</button></td>
            		<!--<input type="button" class="btn btn-primary" ng-click="editForm(forms.id)" value="Edit">
					<input type="button" class="btn btn-danger" ng-click="removeForm(forms.id)" value="Remove">
					<input type="button" class="btn btn-approve" ng-click="approveForm(form.id)" value="Approve">-->
                </tr>
            </tbody>
        </table>

    </uib-accordion-group>
  
  </uib-accordion>
</div>
    </div>
        
</div>
</div>
