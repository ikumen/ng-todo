angular.module('Yata')
.directive('todoEdit', function(TodoService) {
	return {
		restrict: 'E',
		scope: {
			todo: '=',
			//doSave: '&save'
		},
		controller: function($scope) {
			$scope.editTodo = $scope.todo;
			$scope.save = function(_todo_) {
				$scope.todo = TodoService.save({
					id: _todo_.id,
					text: _todo_.text,
					done: _todo_.done
				});
			}
		},
		templateUrl: '/components/todo-edit.template.html'
	}
});