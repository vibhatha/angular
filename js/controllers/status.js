/*myApp.controller('StatusController', function($scope,$rootScope,$firebase,$firebaseAuth){


$rootScope.$on('$firebaseAuth:authWithPassword', function(e,authUser){


	console.log(authUser);
	$scope.userEmail = authUser.email;
	console.log("Logged In User"+authUser.email);


});//login


});//StatusController*/
myApp.controller('StatusController', function($scope, $rootScope, $firebase, $firebaseAuth,AuthenticationFactory,FIREBASE_URL) {

//console.log($rootScope);

    var getAuthUser

    $scope.userEmail ="";

    $rootScope.$on('$firebaseAuth:authWithPassword', function(e, authUser){
        console.log("StatusController");
        $scope.userEmail = authUser.password.email;
        console.log("Email: "+$scope.userEmail)
        getAuthUser = authUser;
        

    }); //$firebaseAuth:login


  $scope.logout = function(){

  		AuthenticationFactory.logout();
  		$scope.userEmail="";

  

  } ;

  $rootScope.$on()



});//StatusController