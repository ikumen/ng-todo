describe('Yata, todo-create-form directive', function() {
	var elm,
		scope,
		textarea,
		$timeout,
		TodoService;

	beforeEach(module('Yata'));
	beforeEach(module('/components/todo-create-form.template.html'));

	beforeEach(inject(function($rootScope, $compile, _TodoService_, _$timeout_) {
		elm = angular.element(
			'<todo-create-form></todo-create-form>');

		$timeout = _$timeout_;
		TodoService = _TodoService_;
		spyOn(TodoService, 'save');

		scope = $rootScope;
		$compile(elm)(scope);
		scope.$apply();

	}));

	function assertEmptyForm() {
		textarea = elm.find('textarea').eq(0);
		// scope.todo should be new
		expect(scope.todo.id).toBeUndefined();
		// should start with emtpy form
		expect(textarea.val()).toBe('');
	}

	it('should start with an empty todo', function() {
		assertEmptyForm();
	});

	it('should create a todo', function() {
		assertEmptyForm();

		var newText = 'Buys some milk'; 
		// update the todo/textfield
		textarea.val(newText);
		// submit the form
		elm.find('form').triggerHandler('submit');
		expect(TodoService.save).toHaveBeenCalled();
		
		//$timeout(assertEmptyForm(), 1000);
	})
})