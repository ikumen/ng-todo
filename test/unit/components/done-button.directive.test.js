describe('Yata, done-button directive', function() {

	var elm,
		scope,
		TodoService,
		helper;

	beforeEach(module('Yata'));
	beforeEach(module('YataTestHelper'));
	beforeEach(module('/components/done-button.template.html'))

	beforeEach(inject(function($rootScope, $compile, _TodoService_, testHelper) {
		elm = angular.element(
			'<yata-done-button todo="todo"></yata-done-button>'
		);

		helper = testHelper;
		scope = $rootScope.$new();
		scope.todo = {
			id: 1,
			text: 'buy some milk',
			done: false
		};		
		TodoService = _TodoService_;
		spyOn(TodoService, 'save').and.callFake(function(todo) {
			return todo;
		})
		$compile(elm)(scope);
		scope.$digest();
	}));

	function assertExistsToBe(value) {
		var button = helper.elFind(elm, 'button');
		expect(button.length === 1).toBe(value);
	}

	function assertDoneStatusToBe(status) {
		var button = helper.elFind(elm, 'button');
		expect(button.eq(0).hasClass('yata-done__active')).toBe(status);
	}

	it('should show if todo can be edited', function() {
		// if underlying todo that is assigned to button has an
		// id, then it can be edited so show button
		assertExistsToBe(true);
		scope.$apply(function() {
			scope.todo.id = undefined;
		})

		// if underlying todo is new, then there's nothing to
		// edit so don't show button
		assertExistsToBe(false);
	})

	it('should have "done" status', function() {
		scope.$apply(function() {
			scope.todo.done = true;
		});
		assertDoneStatusToBe(true);
	});

	it('should not have "done" status', function() {
		assertDoneStatusToBe(false);
	});

	it('should update "done" status when clicked', function() {
		// given a button with done status == false
		assertDoneStatusToBe(false);
		// click button to toggle done status to true
		var button = helper.elFind(elm, 'button');
		button.eq(0).triggerHandler('click');
		
		assertDoneStatusToBe(true);
		expect(TodoService.save).toHaveBeenCalled();
	});
})