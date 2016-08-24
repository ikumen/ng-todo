'use strict';

require('../helper.js');

describe('TodoApp List View', function() {

	beforeEach(angular.mock.module('TodoApp'));
	beforeEach(angular.mock.module('TodoAppTest'));

	var $controller,
		$scope,
		$location = jasmine.createSpyObj('$location', ['path']),
		TodoService,
		testHelper;

	beforeEach(function() {
		inject(function(_$controller_, _$rootScope_, _TodoService_, _testHelper_) {
			$controller = _$controller_;
			$scope = _$rootScope_.$new();
			testHelper = _testHelper_;
			TodoService = _TodoService_;
			// TodoService = testHelper.spyOnAndResolveData(_TodoService_, 'list', [
			// 	{id: new Date().getTime(), text: 'buy milk', done: false},
			// 	{id: new Date().getTime(), text: 'pick up kids', done: false},
			// 	{id: new Date().getTime(), text: 'finish book', done: false}
			// ]);
		});
	});

	function setUpController(beforeFn) {
		if(beforeFn && typeof beforeFn === 'function') {
			beforeFn.apply(null, arguments);
		}
		$controller('listCtrl', {
			$scope: $scope,
			$location: $location,
			TodoService: TodoService
		});
	}

	it('should have list of 4 todos', function() {
		setUpController();
		$scope.$apply();
		expect($scope.todos.length).toEqual(4);
	});

	it('should get details/edit view', function() {
		setUpController();
		$scope.$apply();

		var todo = $scope.todos[0];
		$scope.edit(todo.id);
		expect($location.path).toHaveBeenCalledWith('/todos/' + todo.id);
	});

});

