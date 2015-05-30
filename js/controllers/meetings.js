myApp.controller('MeetingsController',function($scope,$firebaseArray,$firebase,$firebaseObject,$firebaseAuth,$location,$rootScope){


 var ref = new Firebase('https://attendanceldcapp-1.firebaseio.com/meetings');
 var simpleLogin = $firebaseAuth(ref);
 var meetings = $firebaseArray(ref);
 
  $scope.meetings = meetings;

  var loggedInUser = $rootScope.currentUser;

   /*meetings.$loaded().then(function(data){
		
		$scope.meetings = meetings;

   });*/

 $scope.currentUserMeetings =[];


 $scope.setUserMeetings = function(meetings){


 	var obj = $firebaseArray(ref);
 	var list;
obj.$loaded()
  .then(function(data) {
    
    var authObj = simpleLogin.$getAuth();
    console.log("Auth Object");
    console.log(authObj);
    var loggedInUser = authObj.password.email;
    $scope.loggedInUser = loggedInUser;

 		angular.forEach(data, function(meeting, key){
 			//console.log(loggedInUser+"==="+meeting.owner);
 			if(loggedInUser==meeting.owner){

 				console.log(meeting);
 					$scope.currentUserMeetings.push(meeting);

 			}
 		});
//meeting data completely loaded at this point
 		console.log($scope.currentUserMeetings.length);

//    
  })
  .catch(function(error) {
    console.error("Error:", error);
  });

 	
   
 	


 	
 };

 $scope.addMeeting = function(){
		var loggedInUser = $rootScope.currentUser;
		 	meetings.$add({ name: $scope.meetingname,date:Firebase.ServerValue.TIMESTAMP,owner:loggedInUser}).then(function(ref) {
		  var id = ref.key();
		  console.log("added record with id " + id);
		  console.log("Meeting name: "+$scope.meetingname )
		  meetings.$indexFor(id); // returns location in the array

		}).then(function(){
			 $scope.meetingname="";
		});
 }

 $scope.deleteMeeting =function (item){

 	meetings.$remove(item).then(function(ref) {
  ref.key() === item.$id; // true

});



 }


 $scope.init = function(){

 	var authData =simpleLogin.$getAuth();

          if (authData) {
            console.log("Logged in as:", authData.uid);
            var loggedInUser = authData.password.email;
            $rootScope.currentUser = loggedInUser;
          } else {
            console.log("No user logged in");
            console.log("Please login")
            $location.path("/login");

          }   

  

 };


 $scope.init();
 $scope.setUserMeetings($scope.meetings);



});