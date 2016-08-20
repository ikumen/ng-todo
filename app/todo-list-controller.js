'use strict';

(function() {

	var angular = require('angular');

	angular.module('TodoApp', []); // create module
		angular.module('TodoApp') // get module
			.controller('listCtrl', function($scope) {
				$scope.todos = [
					'buy milk',
					'pickup kids',
					'read book',
					'another'
				]
			});
})();

