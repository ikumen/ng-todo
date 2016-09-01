angular.module('Yata')
.directive('todoListItem', function(TodoService) {
	return {
		restrict: 'E',
		scope: {
			todo: '=',
		},
		controller: function($scope) {
			$scope.isEdit = false;
			$scope._todo_ = angular.copy($scope.todo);
			$scope.showEdit = function() {
				$scope.isEdit = true;
			}
			$scope.save = function(_todo_) {
				var saved = TodoService.save({
					id: _todo_.id,
					text: _todo_.text,
					done: _todo_.done
				});
				$scope.todo = saved;
				$scope.isEdit = false;
			}
		},
		templateUrl: '/components/todo-list-item.template.html'
	}
});