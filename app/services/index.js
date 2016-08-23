'use strict';

var angular = require('angular');

angular.module('TodoApp')
	.factory('TodoService', require('./todo.service.js'));