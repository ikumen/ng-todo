'use strict';

angular.module('TodoApp', [])

	.controller('listCtrl', function($scope) {
		$scope.todos = [
			'buy milk',
			'pickup kids',
			'read book',
			'another'
		]
	})
	
	.factory('Utils', function() {
		return {
			copy: function(src, dest) {
				angular.copy(src, dest);
			}
		}
	})

	.factory('TodoService', function(Utils) {
		var _store = [];

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
				return todo;
			},
			update: function(todo) {
				var index;
				if(todo && todo.id && (index = _getIndex(todo.id)) >= 0) {
					_store[index].text = todo.text || _store[index].text;
					_store[index].done = todo.done !== undefined ? todo.done :_store[index].done;
					return todo;
				}
				return null;
			},
			get: function(id) {
				var index;
				if(id && (index = _getIndex(id)) >= 0) {
					return _store[index];
				}
				return null;
			},
			list: function() {
				var todos = [];
				Utils.copy(_store, todos);
				return todos;
			},
			delete: function(id) {
				var index;
				if(id && (index = _getIndex(id)) >= 0) {
					_store.splice(index, 1);
					return id;
				}
				return null;
			}
		}

		return api;
	});

