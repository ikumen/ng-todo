angular.module('Yata')
.config(function($routeProvider) {
	var editCtrl = {
		templateUrl: '/views/todo-edit.template.html',
		controller: 'TodoEditCtrl'
	};

	$routeProvider
		.when('/todos/new', editCtrl)
		.when('/todos/:id', editCtrl);
})
.controller('TodoEditCtrl', function($scope, $routeParams, $location, TodoService) {

	$scope.todo = {
		id: null,
		text: '',
		done: false
	};

	$scope.finish = function() {
		$location.path('/todos')
	}

	if($location.path() !== '/todos/new' && (!$routeParams.id 
			|| ($scope.todo = TodoService.get(parseInt($routeParams.id, 10))) === null)) {
		$scope.finish();
	}

});