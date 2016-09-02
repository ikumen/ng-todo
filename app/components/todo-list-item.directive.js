angular.module('Yata')
.directive('todoListItem', function(TodoService) {
	return {
		//restrict: 'A', default
		scope: {
			todo: '=todoListItem',
		},
		controller: function($scope, $element) {
			$scope.isEdit = false;
			$scope._todo_ = angular.copy($scope.todo);
			
			$scope.showEdit = function() {
				$scope.isEdit = true;
			}

			$scope.delete = function(_todo_) {
				if(TodoService.delete(_todo_.id)) {
					$element.remove();
					$scope.$destroy();
				}
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