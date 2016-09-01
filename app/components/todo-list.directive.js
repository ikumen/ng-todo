angular.module('Yata')
.directive('todoList', function(TodoService) {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {},
		controller: function($scope) {
			$scope.todos = TodoService.list();
		},
		templateUrl: '/components/todo-list.template.html'
	}
});