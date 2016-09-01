describe('Yata, TodoService', function() {

	var $rootScope, TodoService;

	// load our module
	beforeEach(module('Yata'));

	// load our dependencies
	beforeEach(inject(function(_$rootScope_, _TodoService_) {
		$rootScope = _$rootScope_;
		TodoService = _TodoService_;
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

		var todos = [];

		beforeEach(function() {
			todos = TodoService.list();
		})

		it('should delete a todo, when given a todo id', function() {
			var todo1 = todos[1];
			expect(todos.length).toBe(3);
			expect(TodoService.get(todo1.id)).toEqual(todo1);

			TodoService.delete(todo1.id);
			expect(TodoService.list().length).toBe(todos.length-1);
			expect(TodoService.get(todo1.id)).toBeNull();
		});

		it('should not delete anything, when given a non-existent id', function() {
			expect(todos.length).toBe(3);
			TodoService.delete(1000);

			expect(todos.length).toBe(3);
		});
	});
});