describe('Yata, delete-button directive', function() {

	var elm,
		scope,
		TodoService,
		utils;

	beforeEach(module('Yata'));
	beforeEach(module('YataTestHelper'));
	beforeEach(module('/components/delete-button.template.html'));

	beforeEach(inject(function($rootScope, $compile, _TodoService_, elmUtils) {
		elm = angular.element(
			'<yata-delete-button todo="todo" on-finish="callback()"></yata-delete-button>'
		);

		utils = elmUtils;
		TodoService = _TodoService_;
		scope = $rootScope.$new();
		scope.todo = {
			id: 1,
			text: 'Buy some milk',
			done: false
		};

		function noOp() {}
		scope.callback = noOp;
		spyOn(scope, 'callback');
		spyOn(TodoService, 'delete').and.callFake(function(id) {
			return id;
		});
		$compile(elm)(scope);
		scope.$digest();

	}));

	function assertExistsToBe(value) {
		var button = utils.find(elm, 'button');
		expect(button.length === 1).toBe(value);
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
	});

	fit('should delete todo and call onFinish', function() {
		assertExistsToBe(true);

		var button = utils.find(elm, 'button');
		button.eq(0).triggerHandler('click');

		expect(TodoService.delete).toHaveBeenCalled();
		expect(scope.callback).toHaveBeenCalled();
	})
});