angular.module('Yata')
.directive('todoListItem', function(TodoService) {
	return {
		//restrict: 'A', default
		scope: {
			todo: '=todoListItem',
		},
		controller: function($scope, $location) {
			$scope.getTodo = function(id) {
				$location.path('/todos/' + id);
			}
		},
		templateUrl: '/components/todo-list-item.template.html'
	}
});