describe('Yata, done-toggle directive', function() {

	var elm,
		scope,
		TodoService;

	beforeEach(module('Yata'));

	beforeEach(inject(function($rootScope, $compile, _TodoService_) {

		elm = angular.element('<span done-toggle="todo"></span>');

		scope = $rootScope;
		scope.todo = {
				id: 1,
				text: 'Buy milk',
				done: false
			}
		$compile(elm)(scope);
		scope.$digest();
		TodoService = _TodoService_;
		spyOn(TodoService, 'save').and.callFake(function(todo) {
			return todo;
		})
	}));

	it('should have toggle done status/class when clicked', function() {
		// start with no done class (as done == false)
		expect(elm.hasClass('done')).toBe(false);

		var currentDoneState = scope.todo.done;
		// simulate clicking element
		elm.triggerHandler('click')
		// should have done class added
		expect(elm.hasClass('done')).toBe(true);
		// should have updated done status
		expect(TodoService.save).toHaveBeenCalledWith({
			id: scope.todo.id,
			done: !currentDoneState
		});
	});			
		
});