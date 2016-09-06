describe('Yata, todo-list-item directive', function() {
	var elm,
		todo1, todo2,
		scope,
		TodoService,
		helper,
		$location;

	beforeEach(module('Yata'));
	beforeEach(module('YataTestHelper'));
	beforeEach(module('/components/todo-list-item.template.html', '/components/done-button.template.html'));

	beforeEach(inject(function($rootScope, $compile, _TodoService_, testHelper, _$location_) {

		elm = angular.element(
			'<ul>' + 
				'<li ng-repeat="todo in todos" todo-list-item="todo"></li>' +
			'</ul>'
		);

		TodoService = _TodoService_;
		helper = testHelper;
		$location = _$location_;
		spyOn($location, 'path');

		scope = $rootScope.$new();
		todo1 = {
			id: 1,
			text: 'Take out the paper and the trash',
			done: true
		};
		todo2 = {
			id: 2,
			text: 'Buy some milk',
			done: false
		};
		scope.todos = [todo1, todo2];
		var e = $compile(elm)(scope);
		scope.$digest();
	}));

	function assertListIsNotEmpty() {
		expect(helper.elFind(elm, 'div span').length).toBe(scope.todos.length);
	}

	it('should show list with todo items', function() {
		assertListIsNotEmpty();		
	})

	it('should show empty list', function() {
		scope.$apply(function() {
			scope.todos = [];	
		});
		expect(helper.elFind(elm, 'div a').length).toBe(0);
	});

	it('should go to item page when clicked', function() {
		assertListIsNotEmpty();
		var item1 = helper.elFind(elm, 'li 0');
		helper.elFind(item1, 'span 0').triggerHandler('click');
		expect($location.path).toHaveBeenCalledWith('/todos/' + todo1.id);
	});


});


