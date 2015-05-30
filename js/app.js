var myApp = angular.module('myApp',['ngRoute','firebase','appControllers']).constant('FIREBASE_URL','https://attendanceldcapp-1.firebaseio.com');

var appControllers = angular.module('appControllers',['firebase']);

myApp.config(['$routeProvider',function($routeProvider){

		$routeProvider.
			when('/login',{
				templateUrl:'views/login.html',
				controller:'RegistrationController'
			}).
			when('/register',{
				templateUrl:'views/register.html',
				controller:'RegistrationController'
			}).
			when('/meetings',{
				templateUrl:'views/meetings.html',
				controller:'MeetingsController'
			}).
			when('/menu',{
				templateUrl:'views/menu.html',
				controller:'MenuController'
			}).
			when('/about',{
				templateUrl:'views/about.html'
			}).
			otherwise({
				redirectTo:'/login'
			});

}]);

