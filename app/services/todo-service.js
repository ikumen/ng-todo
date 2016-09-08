angular.module('Yata')
.factory('TodoService', function() {
	var _seq = 1;
	var _store = [
		// {id: 1, text: 'Take out the paper and the trash', done: false},
		// {id: 2, text: 'Buy some milk', done: false},
		// {id: 3, text: 'Finish homework', done: false},
		// {id: 4, text: 'Book flight reservations', done: false},
		// {id: 5, text: 'Learn to cook', done: false},
		// {id: 6, text: 'Read a book', done: true},
		// {id: 7, text: 'Pick up the kids from school', done: false},
		// {id: 8, text: 'Buy birthday present', done: false},
		// {id: 9, text: 'Clean up the house', done: false},
		// {id: 10, text: 'Feed the cats', done: true},
		// {id: 11, text: 'Learn algorithms', done: false},
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
			if(todo && todo.id) {
				return api._update(todo);
			} else {
				return api._create(todo);
			}
		},
		saveAll: function(todos) {
			var savedTodos = [];
			todos.forEach(function(todo) {
				savedTodos.push(api.save(todo));
			});
			return savedTodos;
		},
		list: function() {
			//var todos = [];
			//angular.copy(_store, todos);
			return _store;
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
		deleteAll: function(ids) {
			var deletedIds = [];
			ids.forEach(function(id) {
				deletedIds.push(api.delete(id));
			});
			return deletedIds;
		},
		_update: function(todo) {
			var index;
			if(todo && todo.id && (index = _getIndex(todo.id)) >= 0) {
				_store[index].text = todo.text || _store[index].text;
				_store[index].done = todo.done !== undefined ? todo.done : _store[index].done;
				//console.log('_store: ', _store);
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
			//console.log('_store: ', _store);
			return todo;
		}

	}

	return api;
});