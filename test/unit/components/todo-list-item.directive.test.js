describe('Yata, todo-list-item directive', function() {
	var elm,
		scope,
		controller,
		TodoService;

	beforeEach(module('Yata'));
	beforeEach(module('/components/todo-list-item.template.html'));

	beforeEach(inject(function($rootScope, $compile, _TodoService_) {

		elm = angular.element(
			'<todo-list-item todo="todo"></todo-list-item>');

		TodoService = _TodoService_;
		spyOn(TodoService, 'save').and.callFake(function(todo) {
			return todo;
		})

		scope = $rootScope.$new();
		scope.todo = {
			id: 1,
			text: 'Take out the paper and the trash',
			done: true
		}
		$compile(elm)(scope);
		scope.$digest();
	}));

	function assertFormHidden() {
		// todo list item showing
		expect(elm.find('span').eq(0).text()).toBe(scope.todo.text);
		// form should be hidden
		expect(elm.find('form').hasClass('ng-hide')).toBe(true);
	}

	it('should show todo item', function() {
		assertFormHidden();
	});

	it('should show form', function() {
		assertFormHidden();

		// click on todo item to edit
		elm.find('span').eq(0).triggerHandler('click')
		// todo list item is hidden
		expect(elm.find('div').eq(1).hasClass('ng-hide')).toBe(true);
		// form is showing
		expect(elm.find('form').hasClass('ng-hide')).toBe(false);	
	});

	it('should save todo on form submit', function() {
		assertFormHidden();

		// click on todo item to edit
		elm.find('span').eq(0).triggerHandler('click')

		var newText = 'Finish homework';
		scope.$apply(function() {
			elm.isolateScope()._todo_.text = newText;	
		});

		elm.find('button').eq(0).triggerHandler('click');
		expect(TodoService.save).toHaveBeenCalledWith({
			id: scope.todo.id,
			text: newText,
			done: scope.todo.done
		});
		expect(elm.find('textarea').val()).toBe(newText);
	})

});


