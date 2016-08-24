'use strict';

require('../helper.js');

describe('TodoApp Edit View', function() {

	var existingTodo = {id: 1, text: 'buy milk', done: false};
	var $controller, 
		$rootScope,
		$scope, 
		$routeParams, 
		$location, 
		testHelper, 
		TodoService;

	var setUpController;

	beforeEach(function() {
		angular.mock.module('TodoApp');
		angular.mock.module('TodoAppTest');

		inject(function(_$controller_, _$rootScope_, 
				_$routeParams_, _$location_, _testHelper_, _TodoService_) {

			$controller = _$controller_;
			$rootScope = _$rootScope_;
			$routeParams = _$routeParams_;
			$scope = $rootScope.$new();
			$location = _$location_;
			testHelper = _testHelper_;
			TodoService = _TodoService_;

			setUpController = function(beforeFn, afterFn) {
				if(beforeFn && typeof beforeFn === 'function') {
					beforeFn.apply(null, arguments);
				}
				$controller('editCtrl', {
					$scope: $scope,
					TodoService: TodoService
				});
				if(afterFn && typeof afterFn === 'function') {
					afterFn.apply(null, arguments);
				}
			};
		});

		testHelper.spyOnAndResolveFn(TodoService, 'get', 
			function(id) {
				return existingTodo;
			});
	});

	it('should have Todo for editing', function() {
		setUpController(function() {
			$routeParams.id = existingTodo.id;	
		});
		$scope.$apply();
		expect(TodoService.get).toHaveBeenCalled();
		expect($scope.todo).toEqual(existingTodo);
	});


	it('should have new Todo for creating', function() {
		setUpController(function() {
			$routeParams.id = 'new';
		});
		expect(TodoService.get).not.toHaveBeenCalled();
		expect($scope.todo).toEqual({text: null, done: false});
	});

	it('should handle a Todo update', function() {
		setUpController(function() {
			$routeParams.id = existingTodo.id;
			spyOn($location, 'path');
			testHelper.spyOnAndResolveFn(TodoService, 'update',
				function(todo) {
					return todo;
			});
		});

		$scope.$apply();
		expect(TodoService.get).toHaveBeenCalled();
		$scope.todo.text = 'Take out the paper and the trash';

		$scope.save();
		$scope.$apply();
		expect(TodoService.update).toHaveBeenCalledWith($scope.todo);
		expect($location.path).toHaveBeenCalledWith('/todos');
	});
	
});