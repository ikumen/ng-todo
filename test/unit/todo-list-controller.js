'use strict';

describe('Todo Application', function() {

	beforeEach(module('TodoApp'));
	var $controller;
	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	describe('list', function() {
		it('should have list of 3 todos', function() {
			var $scope = {};
			var ctrl = $controller('listCtrl', {$scope: $scope});
			expect($scope.todos.length).toBe(4);
		}); 
	})
});		
