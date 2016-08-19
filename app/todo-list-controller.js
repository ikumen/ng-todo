'use strict';

angular.module('TodoApp', []); // create module
		angular.module('TodoApp') // get module
			.controller('listCtrl', function($scope) {
				$scope.todos = [
					'buy milk',
					'pickup kids',
					'read book'
				];
			});