
angular.module('Yata', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
		.otherwise({
			redirectTo: '/todos'
		});
});