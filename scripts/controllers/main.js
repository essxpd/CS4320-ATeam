angular.module('cs4320aTeamApp')
    .controller('MainCtrl', function($scope, $location, $http, $window){
        /* Temporary applicant name and ferpa score to make UI skeleton look a little better
        Be sure to Delete once real data is being brought in */
        $scope.name = "John Doe";
        $scope.ferpa = 86;
        $scope.DoB = new Date("September 1, 1939");
        $scope.title = "Director";
        $scope.dept = "The Dept";
        $scope.paw = "jdoe39";
        $scope.id = "11111111";
        $scope.addr = "1111 East Broadway";
        $scope.phoneNum = "(555)555-5555";
        /* Delete above code once real data is brought in */
        $scope.login = function(){
            var config = {
                url: '/model/auth.php',
                method: 'POST',
                data: {
                    username: $scope.username,
                    password: $scope.password
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
            $http(config)
            .success(function(data, status, headers, config){
                if(data.status){
                    $scope.fname = data.fname;
                    $scope.lname = data.lname;
                    $scope.fullName = data.fname + " " + data.lname;
                    $scope.ferpa = data.ferpa;
                    $scope.dob = data.dob;
                    $scope.title = data.title;
                    $scope.dept = data.dept;
                    $scope.empID = data.empID;
                    $scope.campAddr = data.campAddr;
                    $scope.phoneNum = data.phoneNum;
                    $location.path('/');
                } 
                else{
                    $scope.errorMsg = 'Login has failed. Please check your name and password then try again.';
                }
            })
            .error(function(data, status, headers, config){
                $scope.errorMsg = "There has been a problem with your login. Please contact so&so@mizzou.edu for support."
            });
        };
    
        //Grab current URL
        $scope.currentPath = $location.path();

        //Change instruction menu based on ferpa score
        if($scope.ferpa > 85){
            $scope.CurrentInstructionSet = true;
        };
    
        $scope.prevForms = [
            {"id":1421, "name":"form1"},
            {"id":7431, "name":"form41"}
        ];
    
        $scope.downloadForm = function(id){
            $window.alert("You just tried to download form " + id + "!");
        }

        //On click, changes url to root/form, triggering a view change
        $scope.goToForm = function(){
            $location.path('/form');
        }
        //When user clicks Take FERPA Quiz button, redirect user to ferpa quiz page
        $scope.takeFERPA = function(){
            $window.location.href = "http://myzoutraining.missouri.edu/ferpa.html";
        }

        //If on form page, do this
        if($scope.currentPath === '/form'){
            /* Edit and uncomment once php is implemented.
            $http.get('/model/secLevels.php')
            .success(function(response){
                $scope.securityLevels = response.securityLevels;
            });
            */
            
            //NgHide and NgShow to control whether security access questions are revealed
            $scope.askSecQuestions = true;
            
            //Tied to ngChange on form.html
            //If checkbox is toggled, reveals questions about whether security should be copied
            //If checkbox is toggled back to false, hides questions about copying security and
            //reveals the usual access level questions instead
            $scope.toggleSecQuestions = function(){
                
                if($scope.toggle === true){
                
                    $scope.askSecQuestions = false;

                    $scope.copySecurity = [
                        {"name":""},
                        {"position":""},
                        {"pawprint":""},
                        {"empId": ""}
                    ];
                }
                else{
                    $scope.askSecQuestions = true;  
                }
                
            };
            
            //Temp dummy data for securityLevels object
            $scope.securityLevels = [
                {"number":"1", "questions":[{"question":"question1", "value":false},{"question":"question2", "value":false}]},
                {"number":"2", "questions":[{"question":"question3", "value":false},{"question":"question4", "value":false}]}
            ];

            /* To submit security level request data
            $scope.saveRequest = function(){
               $http.post('/model/saveRequest.php', {
                    requestType: $scope.requestType,
                    studentWorker: $scope.studentWorker,
                    secAnswers: $scope.securityLevels
                }); 
            }
            */

        };
      });
