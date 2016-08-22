'use strict';

describe('Todo Application', function() {

	beforeEach(module('TodoApp'));
	var $controller;

	describe('Controllers', function() {
		beforeEach(inject(function(_$controller_) {
			$controller = _$controller_;
		}));

		describe('list', function() {
			it('should have list of 3 todos', function() {
				var $scope = {};
				var ctrl = $controller('listCtrl', {$scope: $scope});
				expect($scope.todos.length).toBe(4);
			}); 
		});

	});

	describe('Todo Service', function() {

		var TodoService, $q, $rootScope;
		beforeEach(inject(function(_TodoService_, _$q_, _$rootScope_) {
			TodoService = _TodoService_;
			$q = _$q_;
			$rootScope = _$rootScope_;
		}));

		it('should create a new Todo', function() {
			var newTodo = {text: 'buy milk'};
			expect(newTodo.id).toBeUndefined();

			var todo;
			
			TodoService.create(newTodo)
				.then(function(todo) {
					expect(todo.id).not.toBeNull();
					expect(todo.text).toBe(newTodo.text)
				
					TodoService.get(todo.id)
						.then(function(found) {
							expect(todo).toEqual(found);
					});
			});

			$rootScope.$apply();

		});

		it('should return a list of todos', function() {
			TodoService.list()
				.then(function(todos) {
					expect(todos.length).toEqual(0);
			});

			var newTodos = [];
			for(var i = 1; i <= 10; i++) {
				var todo = {text: 'do ' + i};
				newTodos.push(todo);
				TodoService.create(todo);
			}

			TodoService.list()
				.then(function(todos) {
					expect(newTodos[0].id).toBeUndefined();
					expect(todos[0].id).not.toBeNull();
					expect(todos[0].text).toEqual(newTodos[0].text);
					expect(todos.length).toBe(newTodos.length);
			});
		
			$rootScope.$apply();	
		});

		it('should update an existing Todo', function() {
			var todo;

			TodoService.create({text: 'take out the trash'})
				.then(function(created) {
					todo = created;
			});
			$rootScope.$apply();

			TodoService.get(todo.id)
				.then(function(found) {
					expect(found).toEqual(todo);
			});
			
			var updatedText = 'Take out the papers and the trash';

			TodoService.update({id: todo.id, text: updatedText});
			$rootScope.$apply();

			var justUpdated;
			TodoService.get(todo.id)
				.then(function(_justUpdated_) {
					justUpdated = _justUpdated_;
			});

			$rootScope.$apply();
			expect(justUpdated.id).toEqual(todo.id);
			expect(justUpdated.text).toEqual(updatedText);
			expect(justUpdated.done).toEqual(todo.done);

			var updatedDone = !todo.done;
			TodoService.update({id: todo.id, done: updatedDone});
			TodoService.get(todo.id)
				.then(function(_justUpdated_) {
					justUpdated = _justUpdated_;
			});
			expect(justUpdated.id).toEqual(todo.id);
			expect(justUpdated.text).toEqual(updatedText);
			expect(justUpdated.done).toEqual(updatedDone);

			$rootScope.$apply();
		})

		it('should delete an existing Todo', function() {
			var todo, todos;

			function setTodos(_todos_) {
				todos = _todos_;
			}

			// confirm we're starting with empty list of todos
			TodoService.list().then(setTodos);
			$rootScope.$apply();
			expect(todos.length).toEqual(0);

			// create a Todo for deleting, then confirm we've created it
			TodoService.create({text: 'buy some milk'})
				.then(function(_todo_) { todo = _todo_; });
			TodoService.list().then(setTodos);
			$rootScope.$apply();
			expect(todos.length).toEqual(1);

			// now delete our Todo, then confirm it's gone
			var deletedId;
			TodoService.delete(todo.id)
				.then(function(_deletedId_) { deletedId = _deletedId_; });
			TodoService.list().then(setTodos);
			$rootScope.$apply();
			expect(deletedId).toEqual(todo.id);
			expect(todos.length).toEqual(0);

		});

	});
});		

