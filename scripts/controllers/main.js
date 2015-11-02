angular.module('cs4320aTeamApp')
  .controller('MainCtrl', function($scope, $http){
  
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
});