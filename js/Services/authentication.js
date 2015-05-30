/*myApp.factory('AuthenticationFactory',function ($firebase,$location,FIREBASE_URL,$rootScope,$firebaseAuth){

  var ref = new Firebase(FIREBASE_URL);
  
  var myObject ={

  	login : function(user){

  		ref.authWithPassword({
		  email    : user.email,
		  password : user.password
		}, function(error, authData) {
			
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		  	window.location.href = "#/meetings";
		    console.log("Authenticated successfully with payload:", authData);
		    $rootScope.$broadcast('$firebaseAuth:authWithPassword',authData);
		    $rootScope.loggedInUser= user.email;
		  }
		  
		});

  	} //login

  }//myObject

  return myObject;

});
*/

myApp.factory('AuthenticationFactory', function ($rootScope, $firebase, $firebaseAuth, FIREBASE_URL, $location) {

  var ref = new Firebase(FIREBASE_URL);
  console.log(FIREBASE_URL);
  var simpleLogin = $firebaseAuth(ref);
  var getAuthData ;
  var myObject = {
      login: function (user) {
          return simpleLogin.$authWithPassword({
              email: user.email,
              password: user.password
          }).then(function(authData){
              $rootScope.$broadcast('$firebaseAuth:authWithPassword',authData);
              console.log("authData:=>AuthenticationFactory")
              //console.log(authData)
              getAuthData = authData;
              console.log(authData);
              $rootScope.currentUser = authData.password.email;
              return authData;
          });
      }, //login

      logout : function(){

        console.log("logout")

        simpleLogin.$unauth();

        var authData =simpleLogin.$getAuth();

          if (authData) {
            console.log("Logged in as:", authData.uid);
          } else {
            console.log("Logged out");
            $rootScope.currentUser="";
          }    
        return authData;   
      }

  } //myObject
  return myObject;
})