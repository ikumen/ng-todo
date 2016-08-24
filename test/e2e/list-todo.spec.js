'use strict';

describe('TodoApp List View', function() {
	it('should have an empty Todo list', function() {
		browser.get('http://localhost:8080');

		expect(element.all(by.repeater('todo in todos')).count()).toEqual(0);

	});
});