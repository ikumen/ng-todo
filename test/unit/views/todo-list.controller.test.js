'use strict';

require('../helper.js');

describe('TodoApp List View', function() {

	beforeEach(angular.mock.module('TodoApp'));
	beforeEach(angular.mock.module('TodoAppTest'));

	var $controller,
		$scope,
		TodoService,
		testHelper;

	beforeEach(function() {
		inject(function(_$controller_, _$rootScope_, _TodoService_, _testHelper_) {
			$controller = _$controller_;
			$scope = _$rootScope_.$new();
			testHelper = _testHelper_;
			TodoService = testHelper.spyOnAndResolveData(_TodoService_, 'list', [
				{id: new Date().getTime(), text: 'buy milk', done: false},
				{id: new Date().getTime(), text: 'pick up kids', done: false},
				{id: new Date().getTime(), text: 'finish book', done: false}
			]);
		});

	});

	it('should have list of 3 todos', function() {
		$controller('listCtrl', {
			$scope: $scope, 
			TodoService: TodoService
		});

		$scope.$apply();
		expect($scope.todos.length).toEqual(3);
	});

});

