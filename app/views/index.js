'use strict';

var angular = require('angular');

angular.module('TodoApp')
	.config(function($routeProvider) {
		$routeProvider
			.when('/todos', {
				templateUrl: './views/todo-list.template.html',
				controller: 'listCtrl'
			})
			.when('/todos/:id', {
				templateUrl: './views/todo-edit.template.html',
				controller: 'editCtrl'
			});
	})

	.controller('listCtrl', require('./todo-list.controller.js'))
	.controller('editCtrl', require('./todo-edit.controller.js'));