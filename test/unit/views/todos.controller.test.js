describe('Yata, todos controller', function() {

	var $controller,
		$scope,
		todos,
		TodoService,
		$location,
		$controller,
		helper;

	beforeEach(module('Yata'));
	beforeEach(module('YataTestHelper'));
	//beforeEach(module('/views/todos.template.html'));

	beforeEach(inject(function(_$controller_, testHelper) {
		$controller = _$controller_;
		helper = testHelper;

		todos = [
			{id: 1, text: 'Buy milk', done: false},
			{id: 2, text: 'Take out the trash', done: true}];

		$scope = {};
		$location = { path: helper.noOp };
		TodoService = { list: helper.noOp };

		spyOn($location, 'path');
		spyOn(TodoService, 'list')
				.and.returnValue(todos);

		$controller('TodosCtrl', {
			$scope: $scope, 
			TodoService: TodoService,
			$location: $location
		});

	}));

	it('should set list of todos', function() {
		expect($scope.todos).toBe(todos);
		expect(TodoService.list).toHaveBeenCalled();
	});

	it('should goto create new todo', function() {
		$scope.addNew();
		expect($location.path).toHaveBeenCalledWith('/todos/new');
	});

});