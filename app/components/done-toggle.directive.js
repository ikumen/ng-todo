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
				scope.todo = TodoService.save({
					id: scope.todo.id,
					done: !scope.todo.done
				})



				if(scope.todo.done) {
					element.addClass('done');
				} else {
					element.removeClass('done');
				}

			});
		},
	}

});