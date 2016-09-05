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

	$scope.delete = function(todo) {
		TodoService.delete(todo.id);
		$scope.finish();
	}

	$scope.finish = function() {
		$location.path('/todos')
	}

	var todoId = $routeParams.id;
	if(todoId !== undefined && todoId !== 'new') {
		console.log('getting existing todo:', todoId)
		$scope.todo = TodoService.get(parseInt(todoId, 10));
		console.log('edit controller todo: ', $scope.todo)
	}

})