angular.module('Yata')
.config(function($routeProvider) {
	$routeProvider
		.when('/todos', {
			templateUrl: '/views/todos.template.html',
			controller: 'TodosCtrl'
		})
})
.controller('TodosCtrl', function($scope, TodoService, $location) {
	$scope.todos = TodoService.list();

	$scope.addNew = function() {
		$location.path('/todos/new');
	}
})