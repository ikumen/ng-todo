angular.module('Yata')
.directive('todoCreateForm', function(TodoService) {
	function newTodo() {
		return {
			text: '',
			done: false
		};
	}

	return {
		controller: function($scope) {
			$scope.todo = newTodo();

			$scope.create = function(todo) {
				TodoService.save({
					text: todo.text,
					done: todo.done
				});
				$scope.todo = newTodo();
			}
		},
		templateUrl: '/components/todo-create-form.template.html'
	}
})