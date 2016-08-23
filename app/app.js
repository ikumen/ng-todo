'use strict';

(function() {

	var angular = require('angular');
	require('angular-route');

	angular.module('TodoApp', ['ngRoute'])
		.config(function($routeProvider) {
			$routeProvider
				.otherwise({
					redirectTo: '/todos'
				})
		})

		.factory('Utils', function() {
			return {
				copy: function(src, dest) {
					angular.copy(src, dest);
				}
			}
		});

	require('./views');	
	require('./services');
})();

