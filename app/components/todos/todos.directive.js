angular.module('Yata')
.directive('todos', function() {
	return {
		replace: true,
		controller: function($scope, TodoService) {
			$scope.todos = TodoService.list();
		},
		templateUrl: '/components/todos/template.html'
	}
});