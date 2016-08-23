'use strict';

(function() {

	var angular = require('angular');
	require('angular-route');

	angular.module('TodoApp', ['ngRoute'])
		.config(function($routeProvider) {
			$routeProvider
			.when('/todos', {
				templateUrl: './list.html',
				controller: 'listCtrl'
			})
			.when('/todos/:id', {
				templateUrl: './edit.html',
				controller: 'editCtrl'
			})
			.otherwise({
				redirectTo: '/todos'
			})
		})

		// .controller('listCtrl', function($scope, $location, TodoService) {
		// 	console.log('hello');
		// 	TodoService.list()
		// 		.then(function(todos) {
		// 			$scope.todos = todos;
		// 	});

		// 	$scope.edit = function(id) {
		// 		$location.path('/todos/' + id);
		// 	}
		// })

		// .controller('editCtrl', function($scope, $routeParams, $location, TodoService) {
		// 	$scope.todo = {
		// 		text: null,
		// 		done: false
		// 	};

		// 	if($routeParams.id) {
		// 		TodoService.get(parseInt($routeParams.id))
		// 			.then(function(_todo_) {
		// 				$scope.todo = {
		// 					id: _todo_.id,
		// 					text: _todo_.text,
		// 					done: _todo_.done
		// 				};
		// 		});
		// 	}

		// 	function createOrUpdateSuccess() {
		// 		$location.path('/todos');
		// 	}

		// 	$scope.save = function() {
		// 		if($scope.todo.id !== undefined) {
		// 			TodoService.update($scope.todo)
		// 				.then(createOrUpdateSuccess);
		// 		} else {
		// 			TodoService.create($scope.todo)
		// 				.then(createOrUpdateSuccess);
		// 		}
		// 	}
		// })
		
		.factory('Utils', function() {
			return {
				copy: function(src, dest) {
					angular.copy(src, dest);
				}
			}
		})

		.factory('TodoService', function($q, Utils) {
			var _store = [];

			function resolve(o) {
				var deferred = $q.defer();
				deferred.resolve(o);
				return deferred.promise;
			}

			function reject(o) {
				var deferred = $q.defer();
				deferred.reject(o);
				return deferred.promise;
			}

			function _generateId() {
				return new Date().getTime();
			}

			function _getIndex(id) {
				for(var i = 0; i < _store.length; i++) {
					if(_store[i].id === id) {
						return i;
					}
				}
				return -1;
			}

			var api = {
				create: function(newTodo) {
					var todo = {
						text: newTodo.text,
						id: _generateId(),
						done: false
					};
					_store.push(todo);
					return resolve(todo);
					
				},
				update: function(todo) {
					var index;
					if(todo && todo.id && (index = _getIndex(todo.id)) >= 0) {
						_store[index].text = todo.text || _store[index].text;
						_store[index].done = todo.done !== undefined ? todo.done :_store[index].done;
						return resolve(todo);
					}
					return reject({status: 404});
				},
				get: function(id) {
					var index;
					if(id && (index = _getIndex(id)) >= 0) {
						return resolve(_store[index]);
					}
					return reject({status: 404});
				},
				list: function() {
					var todos = [];
					Utils.copy(_store, todos);
					return resolve(todos);
				},
				delete: function(id) {
					var index;
					if(id && (index = _getIndex(id)) >= 0) {
						_store.splice(index, 1);
						return resolve(id);
					}
					return reject({status: 404});
				}
			}

			return api;
		});

	require('./views');	
})();

