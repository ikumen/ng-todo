describe('Yata, todo-list-item directive', function() {
	var elm,
		todo,
		scope,
		controller,
		TodoService;

	beforeEach(module('Yata'));
	beforeEach(module('/components/todo-list-item.template.html'));

	beforeEach(inject(function($rootScope, $compile, _TodoService_) {

		elm = angular.element(
			'<ul>' + 
				'<li ng-repeat="todo in todos" todo-list-item="todo"></li>' +
			'</ul>'
		);

		TodoService = _TodoService_;

		scope = $rootScope.$new();
		todo = {
			id: 1,
			text: 'Take out the paper and the trash',
			done: true
		};
		scope.todos = [todo];
		var e = $compile(elm)(scope);
		scope.$digest();
	}));

	function find(elm, path) {
		var parts = path.split(/\s+/);
		var _elm_ = elm;
		parts.forEach(function(part) {
			var n = parseInt(part);
			if(isNaN(n)) {
				_elm_ = _elm_.find(part);
			} else {
				_elm_ = _elm_.eq(n);
			}
		});
		return _elm_;
	}

	function assertFormHidden() {
		// todo list item showing		
		expect(find(elm, 'li div 0').hasClass('ng-hide')).toBe(false);
		expect(find(elm, 'li span 0').text()).toEqual(todo.text);
		// form should be hidden
		expect(find(elm, 'form').hasClass('ng-hide')).toBe(true);
	}

	it('should show todo item', function() {
		assertFormHidden();
	});

	it('should show form', function() {
		assertFormHidden();

		// click on todo item to edit
		find(elm, 'li span 0').triggerHandler('click')
		// todo list item is hidden
		expect(find(elm, 'li div 0').hasClass('ng-hide')).toBe(true);
		// form is showing
		expect(find(elm, 'form').hasClass('ng-hide')).toBe(false);	
	});

	it('should save todo on form submit', function() {
		spyOn(TodoService, 'save').and.callFake(function(todo) {
			return todo;
		});

		assertFormHidden();

		// click on todo item to edit
		find(elm, 'li span 0').triggerHandler('click')

		var newText = 'Finish homework';
		scope.$apply(function() {
			find(elm, 'li 0').isolateScope()._todo_.text = newText;	
		});

		find(elm, 'li button 0').triggerHandler('click');
		expect(TodoService.save).toHaveBeenCalledWith({
			id: todo.id,
			text: newText,
			done: todo.done
		});
		expect(elm.find('textarea').val()).toBe(newText);
	})

	it('should delete the todo', function() {
		spyOn(TodoService, 'delete').and.callFake(function(id) {
			return id;
		});

		//spyOn(elm, '$remove');
		
		var idToDelete = todo.id;

		// delete button should be defined
		expect(find(elm, 'button 1').text()).toBe('Delete');
		// delete the todo
		find(elm, 'button 1').triggerHandler('click');

		expect(TodoService.delete).toHaveBeenCalledWith(idToDelete);
		expect(find(elm, 'li').length).toBe(0);
	});

});


