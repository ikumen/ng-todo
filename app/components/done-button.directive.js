angular.module('Yata')
.directive('yataDoneButton', function(TodoService) {
	return {
		restrict: 'E',
		scope: {
			_todo_: '=todo'
		},
		controller: function($scope) {
			$scope.toggleDone = function() {
				var updated = TodoService.save({
					id: $scope._todo_.id,
					done: !$scope._todo_.done
				});

				$scope._todo_.done = updated.done;
			}
		},
		templateUrl: '/components/done-button.template.html'
	}
});