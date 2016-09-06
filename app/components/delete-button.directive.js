angular.module('Yata')
.directive('yataDeleteButton', function(TodoService) {
	return {
		restrict: 'E',
		scope: {
			_todo_: '=todo',
			onFinish: '&'
		},
		controller: function($scope) {
			$scope.delete = function() {
				if($scope._todo_.id) {
					var id = TodoService.delete($scope._todo_.id);
					if(id === $scope._todo_.id) {
						$scope.onFinish();
					}
				}
			}
		},
		templateUrl: '/components/delete-button.template.html'
	};
});