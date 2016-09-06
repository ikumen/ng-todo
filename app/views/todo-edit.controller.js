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

	var todoId = $routeParams.id;
	if(!(todoId !== undefined && todoId !== 'new' && 
			($scope.todo = TodoService.get(parseInt(todoId, 10))) != null)) {	
		$scope.finish();
	} 

});