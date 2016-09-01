describe('Yata, TodoService', function() {

	var $rootScope, TodoService;

	// load our module
	beforeEach(module('Yata'));

	// load our dependencies
	beforeEach(inject(function(_$rootScope_, _TodoService_) {
		$rootScope = _$rootScope_;
		TodoService = _TodoService_;

		TodoService.saveAll([
			{text: 'Buy some milk', done: false},
			{text: 'Take out the trash', done: false},
			{text: 'Finish homework', done: false}
		]);

	}));

	describe('save(todo)', function() {
		var todo = {
			text: 'Buy some milk',
			done: false
		};

		it('should create the todo, when given a new todo', function() {
			// assume our repository has no todos
			expect(TodoService.list().length).toBe(3);
			expect(todo.id).toBeUndefined();

			spyOn(TodoService, 'save').and.callThrough();
			todo = TodoService.save(todo);

			expect(todo.id).not.toBeUndefined();
			expect(TodoService.list().length).toBe(4);
			expect(TodoService.save).toHaveBeenCalled();
		});

		it('should update the todo, when given existing todo', function() {
			var todos = TodoService.list();
			var todosCount = todos.length;
			expect(todosCount).toBe(3);
			expect(todos[0].id).toBeDefined();

			var todo1 = todos[1];
			todo1.text = 'Take out the paper and the trash!';
			todo1.done = true;
			TodoService.save(todo1);

			todos = TodoService.list();
			expect(todos.length).toBe(todosCount);
			expect(todos[1]).toEqual(todo1);
		});	
	});


	describe('get(id)', function() {
		it('should return todo, when given a todo id', function() {
			expect(TodoService.get(1)).toBeDefined();
		});

		it('should return null, when given a non-existent id', function() {
			expect(TodoService.get(1000)).toBeNull();
		})
	});
	
	describe('list()', function() {
		it('should return a list of todos', function() {
			expect(TodoService.list().length).toBe(3);
		});
	});

	describe('delete(id)', function() {

		it('should delete a todo, when given a todo id', function() {
			var todosLength = TodoService.list().length;
			expect(todosLength).toBe(3);
			var todo1 = TodoService.list()[1]; // we know we've got 3 todos
			expect(TodoService.get(todo1.id)).toEqual(todo1);

			TodoService.delete(todo1.id);
			expect(TodoService.list().length).toBe(todosLength-1);
			expect(TodoService.get(todo1.id)).toBeNull();
		});

		it('should not delete anything, when given a non-existent id', function() {
			expect(TodoService.list().length).toBe(3);
			TodoService.delete(1000);
			expect(TodoService.list().length).toBe(3);
		});
	});
});