angular.module('Yata')
.directive('todoEditForm', function(TodoService) {
	return {
		restrict: 'E',
		scope: {
			todo: '=',
			onFinish: '&'
		},
		controller: function($scope) {
			$scope.nothingToSave = false;
			$scope._todo_ = angular.copy($scope.todo);

			function isEmpty() {
				return $scope._todo_.text.trim().length === 0;
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
					$scope.onFinish();
				} else {
					$scope.nothingToSave = true;
				}
			}
		},
		templateUrl: '/components/todo-edit-form.template.html'
	}
})