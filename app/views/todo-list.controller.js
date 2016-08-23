'use strict';

module.exports = function($scope, $location, TodoService) {

	$scope.todos = [];

	$scope.edit = function(id) {
		$location.path('/todos/' + id);
	};

	TodoService.list()
		.then(function(_todos_) {
			$scope.todos = _todos_;
	});
};