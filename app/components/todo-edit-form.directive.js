angular.module('Yata')
.directive('todoEditForm', function(TodoService) {
	return {
		restrict: 'E',
		scope: {
			todo: '=',
			finish: '&'
		},
		controller: function($scope) {
			$scope._todo_ = angular.copy($scope.todo);

			function isEmpty() {
				return $scope._todo_.text.trim().length === 0;
			}

			function isDirty() {
				return $scope._todo_.text.trim() !== $scope.todo.text ||
					$scope._todo_.done !== $scope.todo.done;
			}

			$scope.hasErrors = function() {
				return $scope.nothingToSave && isEmpty();
			}

			$scope.save = function() {
				if(!isEmpty()) {
					TodoService.save({
						id: $scope._todo_.id,
						text: $scope._todo_.text
					});
					$scope.finish();
				} else {
					$scope.nothingToSave = true;
				}
			}
		},
		templateUrl: '/components/todo-edit-form.template.html'
	}
})