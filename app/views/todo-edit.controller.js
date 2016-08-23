'use strict';

module.exports = function($scope, $routeParams, $location, TodoService) {
	$scope.todo = {
		text: null, 
		done: false
	};

	function createOfUpdateSuccess() {
		$location.path('/todos');
	}

	$scope.save = function() {
		if($scope.todo.id !== undefined) {
			TodoService.update($scope.todo)
				.then(createOfUpdateSuccess);
		} else {
			TodoService.create($scope.todo)
				.then(createOfUpdateSuccess);
		}
	}

	if($routeParams.id !== 'new') {
		TodoService.get(parseInt($routeParams.id))
			.then(function(_todo_) {
				$scope.todo = {
					id: _todo_.id,
					text: _todo_.text,
					done: _todo_.done
				};
		});
	}

}