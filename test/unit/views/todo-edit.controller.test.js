describe('Yata, todo-edit controller', function() {

	var $controller,
		$scope = {},
		$routeParams = {},
		$location = {},
		TodoService,
		helper,
		todo;

	beforeEach(module('Yata'));
	beforeEach(module('YataTestHelper'));
	
	beforeEach(inject(function(_$controller_, testHelper) {
		$controller = _$controller_;
		helper = testHelper;

		//$location = jasmine.createSpyObj('$location', ['path']);
		TodoService = {get: helper.noOp};
		todo = {
			id: 1,
			text: 'Don\'t forget the milk',
			done: false
		};
		spyOn(TodoService, 'get').and.returnValue(todo);

	}));

	function setUpTestFor(id) {
		$location.path = helper.noOp;
		if(id === 'new') {
			spyOn($location, 'path').and.returnValue('/todos/new');
		} else {
			spyOn($location, 'path').and.returnValue('/todos/' + id);
			$routeParams.id = id;
		}
		
		$controller('TodoEditCtrl', {
			$scope: $scope,
			$routeParams: $routeParams,
			$location: $location,
			TodoService: TodoService
		});
	}

	it('should show edit view for new todo', function() {
		setUpTestFor('new');

		// if /todos/new was called
		expect($scope.todo).toEqual({id: null, text:'', done: false});
	});

	it('should redirect to todos view if invalid id', function() {
		setUpTestFor(undefined);
		expect($location.path).toHaveBeenCalledWith('/todos');
	});

	it('should show edit view for existing todo', function() {
		setUpTestFor(todo.id);
		expect($scope.todo).toEqual(todo);
	});

	it('should redirect to todos view', function() {
		setUpTestFor('new');

		expect(typeof $scope.finish === 'function').toBe(true);
		$scope.finish();

		expect($location.path).toHaveBeenCalledWith('/todos');
	});
});