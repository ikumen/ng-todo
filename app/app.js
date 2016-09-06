
angular.module('Yata', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
		.otherwise({
			redirectTo: '/todos'
		});
})
.directive('fixMdlRender', function() {
	return {
		restrict: 'A',
		link: function(scope, el) {
			el.ready(function() {
				componentHandler.upgradeElement(el[0]);
			});
		}
	}
})
;