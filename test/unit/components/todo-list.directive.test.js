describe('Yata, todos directive', function() {

	var elm,
		scope,
		todos;

	beforeEach(module('Yata'));
	beforeEach(module('/components/todo-list.template.html'));

	beforeEach(inject(function($rootScope, $compile) {

		todos = [
			{id: 1, text: 'Buy some milk', done: false},
			{id: 2, text: 'Take out the trash', done: false},
		];

		elm = angular.element(
			'<todo-list todos="todos"></todo-list>');

		scope = $rootScope;
		$compile(elm)(scope);		
		scope.$digest();
	}));

	it('should display a list of todos', function() {
		scope.$apply(function() {
			scope.todos = todos;
		});
		var lis = elm.find('li');
		expect(lis.length).toBe(2);
	});

	it('should display an empty list of todos', function() {
		var lis = elm.find('li');
		expect(lis.length).toBe(0);		
	})

});