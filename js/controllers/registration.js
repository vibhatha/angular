myApp.controller('RegistrationController',function($scope,$location,AuthenticationFactory,$firebaseAuth){

$scope.user = {};
var User ={};
User.email='';
User.password='';
User.firstname='';
User.lastname='';

$scope.login = function (user){

	/*var ref = new Firebase("https://attendanceldcapp-1.firebaseio.com");
ref.authWithPassword({
  email    : user.email,
  password : user.password
}, function(error, authData) {
	
  if (error) {
    console.log("Login Failed!", error);
  } else {
  	window.location.href = "#/meetings";
    console.log("Authenticated successfully with payload:", authData);
   
  }
  
});*/

  AuthenticationFactory.login(user);
  


	
};

$scope.register = function(user){

	//register user

	var ref = new Firebase("https://attendanceldcapp-1.firebaseio.com");
      ref.createUser({
        email    : user.email,
        password : user.password,
        firstname: user.firstname,
        lastname : user.lastname
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          console.log(user.email+" "+user.firstname);
         $location.path("/login");
        }
      });

      };


});