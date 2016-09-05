angular.module('Yata')
.config(function($routeProvider) {
	$routeProvider
		.when('/todos', {
			templateUrl: '/views/todos.template.html',
			controller: 'TodosCtrl'
		})
})
.controller('TodosCtrl', function($scope, TodoService) {
	$scope.todos = TodoService.list();
})