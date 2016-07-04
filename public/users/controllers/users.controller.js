angular.module('users').controller('usersController', ['Authentication', '$scope','$routeParams', 'UsersAPI',
	function(Authentication, $scope, $routeParams, UsersAPI){
		console.log('Authentication', Authentication);
		$scope.user = UsersAPI.get({userId : $routeParams.userId});
		$scope.edit = function(user){
			//user.$update()
			console.log('on edit');
		}
	}
]);