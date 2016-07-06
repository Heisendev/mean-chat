angular.module('users').controller('usersController', ['Authentication','$window', '$scope','$routeParams', '$location', 'UsersAPI', 'SigninAPI',
	function(Authentication, $window, $scope, $routeParams, $location, UsersAPI, SigninAPI){
		console.log('Authentication', Authentication);
		$scope.user = {} ;

		if($location.url() !== '/users/login' || $location.url() !== '/users/new'){
			UsersAPI.get({userId : $routeParams.userId}, function(user){
				console.log(arguments);
				$scope.user = user;
			}, function(err){
				$scope.errorMsg = "Vous n'avez pas acces a ce formulaire";
				console.log(err);
			});
		}

		$scope.edit = function(){
			$scope.user.$update(function(){
				console.log('update succeded');
			}, function(){
				console.log('update failed');
			});
		};

		$scope.create = function(){
			var user = new UsersAPI({
				username : this.username,
				firstName : this.firstName,
				lastName : this.lastName,
				email : this.email,
				password : this.password,
				color : this.color
			});
			user.$save(function(response){
				console.log('yeah it succeded', response);
			}, function(err){
				console.log('it failed dammit', err);
			});
		};

		$scope.logout = function(){
			console.log('in logout');
		};

		$scope.login = function(){
			var login = new SigninAPI({
				username: this.username,
				password: this.password
			});
			login.$save(function(response){
				$window.location = '/';
			}, function(err){
				console.log('not logged', err);
			});
		};
	}
]);
