describe('Yata, todos directive', function() {

	var elm,
		scope;

	beforeEach(module('Yata'));
	beforeEach(module('/components/todos/template.html'));

	beforeEach(inject(function($rootScope, $compile) {

		elm = angular.element(
			'<todos/>');

		scope = $rootScope;
		$compile(elm)(scope);
		scope.$digest();
	}));

	it('should display a list of todos', function() {
		var lis = elm.find('li');
		expect(lis.length).toBe(3);
	});

});