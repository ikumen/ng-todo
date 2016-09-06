describe('Yata, done-button directive', function() {

	var elm,
		scope,
		TodoService,
		utils;

	beforeEach(module('Yata'));
	beforeEach(module('YataTestHelper'));
	beforeEach(module('/components/done-button.template.html'))

	beforeEach(inject(function($rootScope, $compile, _TodoService_, elmUtils) {
		elm = angular.element(
			'<yata-done-button todo="todo"></yata-done-button>'
		);

		utils = elmUtils;
		scope = $rootScope.$new();
		scope.todo = {
			id: 1,
			text: 'buy some milk',
			done: false
		};		
		TodoService = _TodoService_;
		$compile(elm)(scope);
		scope.$digest();
	}));

	function assertDoneStatusToBe(status) {
		var button = utils.find(elm, 'button');
		expect(button.eq(0).hasClass('yata-done__active')).toBe(status);
	}

	fit('should show a button with "done" status', function() {
		scope.$apply(function() {
			scope.todo.done = true;
		});
		assertDoneStatusToBe(true);
	});

	fit('should show a button without "done" status', function() {
		assertDoneStatusToBe(false);
	});

	fit('should update button "done" status when clicked', function() {
		// given a button with done status == false
		assertDoneStatusToBe(false);
		// click button to toggle done status to true
		var button = utils.find(elm, 'button');
		button.eq(0).triggerHandler('click');
		
		assertDoneStatusToBe(true);
	});
})