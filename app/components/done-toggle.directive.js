angular.module('Yata')
.directive('doneToggle', function(TodoService) {

	return {
		restrict: 'A',
		scope: {
			//use the directive attribute name itself
			todo: '=doneToggle'
		},
		link: function(scope, element, attrs) {
			element.on('click', function() {
				var updated = TodoService.save({
					id: scope.todo.id,
					done: !scope.todo.done
				})

				scope.todo.done = updated.done;
				scope.$apply();

			});
		},
	}

});