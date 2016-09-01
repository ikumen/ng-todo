angular.module('Yata')
.controller('todoListCtrl', function($scope, TodoService) {
	function newTodo() {
		return {
			text: 'hello',
			done: false
		};
	}
	$scope.todo = newTodo();
	$scope.todos = TodoService.list();
})
.directive('todoList', function() {
	return {
		replace: true,
		scope: {
			todos: '='
		},
		templateUrl: '/components/todo-list.template.html'
	}
});