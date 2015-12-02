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
    else if($_SESSION["loggedIn"] == 2)
    {
    	header("Location: http://$host$uri/#/employer");
    }
    else if($_SESSION["loggedIn"] == 3)
    {
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
<h2>Welcome, {{loggedInUser.Full_Name}}! &nbsp;<small><b>Your current FERPA score is {{loggedInUser.Ferpa_Score}}.</b></small></h2>
	<!--Previous Submissions
	<div>
		<div id="accordion" class="panel-group">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a data-toggle="collapse" data-parent="#accordion" href="#collapseMain">Previous Submissions</a>
					</h4>
				</div>
				<div id="collapseMain" class="panel-collapse collapse">
					<div class="panel-body">
						<div ng-repeat="forms in prevForms"><a ng-click="downloadForm(forms.id)">{{forms._id}}</a></div>
					</div>
				</div>
			</div>
		</div>
	</div> -->
    

<div ng-app="accordion" class="accordion-test">

  <uib-accordion>
    
    <uib-accordion-group>
      
        <uib-accordion-heading>
            Forms Listed by Date Submitted <i class="pull-right glyphicon" ng-class="{'glyphicon-chevron-down': isopen, 'glyphicon-chevron-right': !isopen}"></i>
        </uib-accordion-heading>

        <table class="table">
            <tbody>
                <tr ng-repeat="form in prevForms" ng-class="{'rejected' : form.isRejected == 'true'}">
                    <td><a ng-click="mongoForm(form._id, form.date)">{{form.date}}</a><span ng-if="form.isRejected == 'true'">&nbsp; &nbsp;<b>REJECTED</b></span></td>
                   <!-- <td><button class="btn btn-primary" ng-click="mongoForm(form._id)">View</button></td> -->
                </tr>
            </tbody>
        </table>

    </uib-accordion-group>
  
  </uib-accordion>
</div>

	
	<!--Instruction Set-->
	<div class="center-block">
		<h3>Submission Instructions: </h3>
		<p ng-show="CurrentInstructionSet">
            
            Welcome to the Electronic Sis Security Form! Using this form, you can request specific access to various parts of myZou. <b>In order to complete the form, you must have a FERPA score of 85 or above. </b>
             
            <br><br>
            
            To submit the application, please click on the button below. You will be redirected to the online application form. Please fill out the form completely and click the "SUBMIT" button at the bottom of the screen. If you are confused about a certain form field, please hover over that form field's name. It will provide additional information as to what should be entered into that form. 
            
            <br><br>
            
            To view previously submitted applications, please refer to the dropdown above.
         
            <br><br>
            
            If you have any questions, please contact our support desk at <a href="mailto:lmaosupport@missouri.edu">lmaosupport@missouri.edu</a>.
        
        </p>
		<p ng-hide="CurrentInstructionSet">
            
            Welcome to the Electronic Sis Security Form! Using this form, you can request specific access to various parts of myZou. <b>In order to complete the form, you must have a FERPA score of 85 or above.</b>
            
            <br><br>
            
            Unfortunately, your FERPA score isn't high enough to meet the criteria. Please click the button below to retake the FERPA quiz. Once you've achieved a score of 85 or above, please log in; the form will be available for you to submit!
            
                        <br><br>
            
            If you have any questions, please contact our support desk at <a href="mailto:lmaosupport@missouri.edu">lmaosupport@missouri.edu</a>.
            
        </p>

        

		<input type="button" class="applicantbutton" ng-click="goToForm()" ng-show="CurrentInstructionSet" value="Fill Out Form">&nbsp;
		<input type="button" class="applicantbutton" ng-click="takeFERPA()" ng-hide="CurrentInstructionSet" value="Take FERPA Quiz">
	</div>
	<br>
	<br>
</div>
</div>
