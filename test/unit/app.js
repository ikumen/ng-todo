'use strict';

var angular = require('angular');
require('angular-mocks');

angular.module('TodoAppTest', [])
	.factory('testHelper', function($q) {
		var deferred = $q.defer();

		function setUpSpyOn(obj, fnName, fnOrData, isReject) {
			var doResolveOrReject = isReject ? deferred.reject : deferred.resolve;
			if(typeof fnOrData === 'function') {
				// allows dynamically adding a function to spy on
				obj[fnName] = fnOrData;
			}

			spyOn(obj, fnName).and.callFake(
				function() {
					if(typeof fnOrData === 'function') {
						doResolveOrReject(fnOrData.apply(null, arguments));
					} else {
						doResolveOrReject(fnOrData.apply(null, arguments));
					}
					return deferred.promise;
				});

			return obj;
		}

		return {
			spyOnAndResolveFn: function(obj, fnName, fnOrData) {
				return setUpSpyOn(obj, fnName, fnOrData, false);
			},
			spyOnAndRejectFn: function(obj, fnName, fnOrData) {
				return setUpSpyOn(obj, fnName, fnOrData, true);
			},
			spyOnAndResolveData: function(obj, fnName, fnOrData) {
				return setUpSpyOn(obj, fnName, fnOrData, false);
			},
			spyOnAndRejectData:function(obj, fnName, fnOrData) {
				return setUpSpyOn(obj, fnName, fnOrData, true);
			}
		}
});

describe('Todo Application', function() {

	beforeEach(angular.mock.module('TodoApp'));
	beforeEach(angular.mock.module('TodoAppTest'));
	
	describe('Controllers', function() {

		var $controller, 
			$rootScope, 
			$scope, 
			$routeParams,
			$location,
			testHelper, 
			TodoService;

		beforeEach(
			angular.mock.inject(
				function(_$controller_, _$rootScope_, _$routeParams_, _$location_, _testHelper_, _TodoService_) {
					$location = _$location_;
					$rootScope = _$rootScope_;
					$scope = _$rootScope_.$new();
					$routeParams = _$routeParams_;
					testHelper = _testHelper_;
					TodoService = _TodoService_;
					$controller = _$controller_;
			})
		);	


		describe('list view', function() {
			it('should have list of 3 todos', function() {
				$controller('listCtrl', {
					$scope: $scope,
					TodoService: testHelper.spyOnAndResolveFn({}, 'list', function() {
							return [
								{id: new Date().getTime(), text: 'buy milk', done: false},
								{id: new Date().getTime(), text: 'pick up kids', done: false},
								{id: new Date().getTime(), text: 'finish book', done: false}
							];
					})
				});
				$scope.$apply();
				expect($scope.todos.length).toBe(3);
			}); 
		});

		describe('edit view', function() {

			var existingTodo = {id: 1, text: 'buy milk', done: false};
			beforeEach(function() {
				// supply a mocked and spyied on version of get
				testHelper.spyOnAndResolveFn(TodoService, 'get', 
					function(id) { 
						return existingTodo; 
				});
			});

			it('should have Todo for editing', function() {
				$routeParams.id = existingTodo.id;
				$controller('editCtrl', {
					$scope: $scope,
					TodoService: TodoService
				});

				$scope.$apply();
				expect(TodoService.get).toHaveBeenCalled();
				expect($scope.todo).toEqual(existingTodo);
			});

			it('should have new Todo for creating', function() {
				$controller('editCtrl', {
					$scope: $scope,
					TodoService: TodoService
				})
				expect(TodoService.get).not.toHaveBeenCalled();
				expect($scope.todo).toEqual({text: null, done: false});
			});

			it('should handle a Todo update', function() {
				$routeParams.id = existingTodo.id;
				spyOn($location, 'path');
				testHelper.spyOnAndResolveFn(TodoService, 'update',
					function(todo) {
						return todo;
				});
				$controller('editCtrl', {
					$scope: $scope,
					TodoService: TodoService
				});

				$scope.$apply();
				expect(TodoService.get).toHaveBeenCalled();
				$scope.todo.text = 'Take out the trash';

				$scope.save();
				$scope.$apply();
				expect(TodoService.update).toHaveBeenCalledWith($scope.todo);
				expect($location.path).toHaveBeenCalledWith('/todos');
			})

		});

	});

	describe('Todo Service', function() {

		var TodoService, $q, $rootScope;
		beforeEach(inject(function(_TodoService_, _$q_, _$rootScope_) {
			TodoService = _TodoService_;
			$q = _$q_;
			$rootScope = _$rootScope_;
		}));

		it('should create a new Todo', function() {
			var newTodo = {text: 'buy milk'};
			expect(newTodo.id).toBeUndefined();

			var todo;
			
			TodoService.create(newTodo)
				.then(function(todo) {
					expect(todo.id).not.toBeNull();
					expect(todo.text).toBe(newTodo.text)
				
					TodoService.get(todo.id)
						.then(function(found) {
							expect(todo).toEqual(found);
					});
			});

			$rootScope.$apply();

		});

		it('should return a list of todos', function() {
			TodoService.list()
				.then(function(todos) {
					expect(todos.length).toEqual(0);
			});

			var newTodos = [];
			for(var i = 1; i <= 10; i++) {
				var todo = {text: 'do ' + i};
				newTodos.push(todo);
				TodoService.create(todo);
			}

			TodoService.list()
				.then(function(todos) {
					expect(newTodos[0].id).toBeUndefined();
					expect(todos[0].id).not.toBeNull();
					expect(todos[0].text).toEqual(newTodos[0].text);
					expect(todos.length).toBe(newTodos.length);
			});
		
			$rootScope.$apply();	
		});

		it('should update an existing Todo', function() {
			var todo;

			TodoService.create({text: 'take out the trash'})
				.then(function(created) {
					todo = created;
			});
			$rootScope.$apply();

			TodoService.get(todo.id)
				.then(function(found) {
					expect(found).toEqual(todo);
			});
			
			var updatedText = 'Take out the papers and the trash';

			TodoService.update({id: todo.id, text: updatedText});
			$rootScope.$apply();

			var justUpdated;
			TodoService.get(todo.id)
				.then(function(_justUpdated_) {
					justUpdated = _justUpdated_;
			});

			$rootScope.$apply();
			expect(justUpdated.id).toEqual(todo.id);
			expect(justUpdated.text).toEqual(updatedText);
			expect(justUpdated.done).toEqual(todo.done);

			var updatedDone = !todo.done;
			TodoService.update({id: todo.id, done: updatedDone});
			TodoService.get(todo.id)
				.then(function(_justUpdated_) {
					justUpdated = _justUpdated_;
			});
			expect(justUpdated.id).toEqual(todo.id);
			expect(justUpdated.text).toEqual(updatedText);
			expect(justUpdated.done).toEqual(updatedDone);

			$rootScope.$apply();
		})

		it('should delete an existing Todo', function() {
			var todo, todos;

			function setTodos(_todos_) {
				todos = _todos_;
			}

			// confirm we're starting with empty list of todos
			TodoService.list().then(setTodos);
			$rootScope.$apply();
			expect(todos.length).toEqual(0);

			// create a Todo for deleting, then confirm we've created it
			TodoService.create({text: 'buy some milk'})
				.then(function(_todo_) { todo = _todo_; });
			TodoService.list().then(setTodos);
			$rootScope.$apply();
			expect(todos.length).toEqual(1);

			// now delete our Todo, then confirm it's gone
			var deletedId;
			TodoService.delete(todo.id)
				.then(function(_deletedId_) { deletedId = _deletedId_; });
			TodoService.list().then(setTodos);
			$rootScope.$apply();
			expect(deletedId).toEqual(todo.id);
			expect(todos.length).toEqual(0);

		});

	});
});		

