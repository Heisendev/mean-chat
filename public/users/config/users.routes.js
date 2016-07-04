angular.module('users').config(['$routeProvider',
	function($routeProvider){
		$routeProvider
			.when('/users/edit/:userId', {
				templateUrl: 'users/views/edit-user.html'
			});
	}
]);
