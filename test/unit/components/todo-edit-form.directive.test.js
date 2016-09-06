describe('Yata, todo-edit-form directive', function() {

	var elm,
		scope,
		TodoService,
		helper, 
		todo1,
		newTodo,
		$compile;

	beforeEach(module('Yata'));
	beforeEach(module('YataTestHelper'));
	beforeEach(module('/components/todo-edit-form.template.html'));

	beforeEach(inject(function($rootScope, _$compile_, _TodoService_, testHelper) {

		elm = angular.element(
			'<todo-edit-form todo="todo" on-finish="callback()">' +
			'</todo-edit-form>');

		TodoService = _TodoService_;
		spyOn(TodoService, 'save').and.callFake(function(todo) {
			//todo.id = 1;
			return todo;
		});
		helper = testHelper;
		$compile = _$compile_;
		scope = $rootScope.$new();
		scope.callback = helper.noOp;
		spyOn(scope, 'callback');
		todo1 = {id: 1, text: 'Feed the dog', done: false};
		newTodo = {id: undefined, text: '', done: false};

	}));

	function setUpForTodo(todo) {
		scope.todo = todo;
		$compile(elm)(scope);
		scope.$digest();
	}

	function assertTextareaToBe(val) {
		expect(helper.elFind(elm, 'form div textarea 0').val()).toBe(val);
	}

	function assertFormHasErrorsToBe(val) {
		expect(elm.isolateScope().hasErrors()).toBe(val);
	}

	it('should show a form for given todo', function() {
		setUpForTodo(todo1);
		// for existing todo above
		assertTextareaToBe(todo1.text)
	});

	it('should show a blank for when given new todo', function() {
		setUpForTodo(newTodo);
		assertTextareaToBe('');
	});

	it('should show error when saving empty todo', function() {
		setUpForTodo(newTodo);

		// confirm we have empty form
		assertTextareaToBe('');

		// given we have an empty form, but no errors as we have
		// not tried to save
		assertFormHasErrorsToBe(false);
		// try to save empty form
		helper.elFind(elm, 'form 0').triggerHandler('submit');
		// confirm we have error
		assertFormHasErrorsToBe(true);
	});

	it('should save a todo and do callback', function() {
		setUpForTodo(newTodo);
		assertTextareaToBe('');

		var newText = 'Buy some milk!';
		elm.isolateScope()._todo_.text = newText;
		scope.$digest();
		assertTextareaToBe(newText);

		helper.elFind(elm, 'form 0').triggerHandler('submit');
		assertFormHasErrorsToBe(false);

		// actual service was called to save todo
		expect(TodoService.save).toHaveBeenCalledWith({
			id: elm.isolateScope()._todo_.id,
			text: elm.isolateScope()._todo_.text
		});

		// after successful save, make sure callback is triggered
		expect(scope.callback).toHaveBeenCalled();
	});

});