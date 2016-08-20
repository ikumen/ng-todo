'use strict';

describe('Todo list', function() {
	it('should have a list of 3 todos', function() {
		browser.get('http://localhost:8080');

		expect(element.all(by.repeater('todo in todos')).count()).toEqual(4);

	});
});