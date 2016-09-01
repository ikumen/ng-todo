angular.module('Yata')
.factory('TodoService', function() {
	var _seq = 1;
	var _store = [
		{id: _generateId(), text: 'Buy some milk', done: false},
		{id: _generateId(), text: 'Take out the trash', done: false},
		{id: _generateId(), text: 'Finish homework', done: true}
	];

	function _generateId() {
		return _seq++;
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
		save: function(todo) {
			console.log('saving:', todo)
			if(todo && todo.id) {
				return api._update(todo);
			} else {
				return api._create(todo);
			}
		},
		list: function() {
			var todos = [];
			angular.copy(_store, todos);
			return todos;
		},
		get: function(id) {
			var index;
			if(id && (index = _getIndex(id)) >= 0) {
				return _store[index];
			} else {
				return null;
			}
		},
		delete: function(id) {
			var index;
			if(id && (index = _getIndex(id)) >= 0) {
				_store.splice(index, 1);
				return id;
			}
			return null;
		},
		_update: function(todo) {
			var index;
			if(todo && todo.id && (index = _getIndex(todo.id)) >= 0) {
				_store[index].text = todo.text || _store[index].text;
				_store[index].done = todo.done !== undefined ? todo.done : _store[index].done;
				console.log('_store: ', _store);
				return todo;
			}
			return null;
		},
		_create: function(newTodo) {
			var todo = {
				text: newTodo.text,
				id: _generateId(),
				done: false
			};
			_store.push(todo);
			console.log('_store: ', _store);
			return todo;
		}

	}

	return api;
});