angular.module('users').config(['$routeProvider', 
	function($routeProvider){
		$routeProvider
			.when('/users/edit/:userId', {
				templateUrl: 'users/views/edit-user.html'
			})
			.when('/users/new', {
				templateUrl: 'users/views/new-user.html'
			}).when('/users/login', {
			templateUrl: 'users/views/login.html'
		});
	}
]);
