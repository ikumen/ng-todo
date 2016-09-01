describe('Yata, todos directive', function() {

	var elm,
		scope,
		TodoService;

	beforeEach(module('Yata'));
	beforeEach(module('/components/todo-list.template.html', '/components/todo-list-item.template.html'));

	beforeEach(inject(function($rootScope, $compile, _TodoService_) {

		elm = angular.element(
			'<todo-list></todo-list>');

		TodoService = _TodoService_;
		scope = $rootScope;
		$compile(elm)(scope);		
	}));

	it('should display a list of todos', function() {
		scope.$apply(function() {
			spyOn(TodoService, 'list').and
				.returnValue([
					{id: 1, text: 'Buy some milk', done: false},
					{id: 2, text: 'Take out the trash', done: false},
				]);			
		});
		var lis = elm.find('li');
		expect(lis.length).toBe(2);
	});

	it('should display an empty list of todos', function() {
		var lis = elm.find('li');
		expect(lis.length).toBe(0);		
	})

});