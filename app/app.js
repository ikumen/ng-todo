'use strict';

angular.module('TodoApp', [])

	.controller('listCtrl', function($scope, TodoService) {
		TodoService.list()
			.then(function(todos) {
				$scope.todos = todos;
		});
	})
	
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

