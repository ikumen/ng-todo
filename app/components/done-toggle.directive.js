angular.module('Yata')
.directive('doneToggle', function(TodoService) {

	return {
		restrict: 'A',
		scope: {
			//use the directive attribute name itself
			target: '=doneToggle'
		},
		controller: function($scope) {
			console.log('done toggle ctrl')
			$scope.toggle = function() {

			}
		},
		link: function(scope, element, attrs) {
			var status = true;
			console.log('help')
			element.on('click', function() {
				if(status) {
					element.addClass('done');
				} else {
					element.removeClass('done');
				}
				status = !status;
				console.log(scope.target)
			});
		},
		//templateUrl: '/components/done-toggle.template.html'
	}

});