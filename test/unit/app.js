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

		var TodoService;
		beforeEach(inject(function(_TodoService_) {
			TodoService = _TodoService_;
		}));

		it('should create a new Todo', function() {
			var newTodo = {text: 'buy milk'};
			expect(newTodo.id).toBeUndefined();

			var todo = TodoService.create(newTodo);
			expect(todo.id).not.toBeNull();
			expect(todo.text).toBe(newTodo.text)

			var created = TodoService.get(todo.id);
			expect(todo).toEqual(created);
		});

		it('should return a list of todos', function() {
			expect(TodoService.list().length).toBe(0);

			var newTodos = [];
			for(var i = 1; i <= 10; i++) {
				var todo = {text: 'do ' + i};
				newTodos.push(todo);
				TodoService.create(todo);
			}

			var todos = TodoService.list();
			expect(todos.length).toBe(newTodos.length);
			
			expect(newTodos[0].id).toBeUndefined();
			expect(todos[0].id).not.toBeNull();
			expect(todos[0].text).toEqual(newTodos[0].text);

			expect(newTodos[newTodos.length-1].id).toBeUndefined();
			expect(todos[todos.length-1].id).not.toBeNull();
			expect(todos[todos.length-1].text).toEqual(newTodos[newTodos.length-1].text);

		});

		it('should update an existing Todo', function() {
			var todo = TodoService.create({text: 'take out the trash'});

			expect(TodoService.get(todo.id)).toEqual(todo);
			var updatedText = 'Take out the papers and the trash';

			TodoService.update({id: todo.id, text: updatedText})
			var justUpdated = TodoService.get(todo.id);
			expect(justUpdated.id).toEqual(todo.id);
			expect(justUpdated.text).toEqual(updatedText);
			expect(justUpdated.done).toEqual(todo.done);

			var updatedDone = !todo.done;
			TodoService.update({id: todo.id, done: updatedDone});
			justUpdated = TodoService.get(todo.id);
			expect(justUpdated.id).toEqual(todo.id);
			expect(justUpdated.text).toEqual(updatedText);
			expect(justUpdated.done).toEqual(updatedDone);

		})

		it('should delete an existing Todo', function() {

			var todo = TodoService.create({text: 'buy some milk'});

			expect(TodoService.get(todo.id)).toEqual(todo);
			var todos = TodoService.list();

			expect(TodoService.delete(todo.id)).toBe(todo.id);
			expect(TodoService.list().length).toEqual(todos.length-1);

		});

	});
});		

