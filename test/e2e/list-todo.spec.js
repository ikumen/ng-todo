'use strict';

describe('TodoApp List View', function() {
	it('should have an empty Todo list', function() {
		browser.get('http://localhost:8080');
		expect(element(by.css('.heading')).getText()).toEqual('Todos');
		expect(element.all(by.repeater('todo in todos')).count()).toEqual(4);
	});

	it('should go to edit/create view', function() {
		expect(element(by.css('.heading')).getText()).toEqual('Todos');
		element(by.xpath('//ul/li/span[contains(.,"Buy milk")]')).click();
		expect(element(by.css('.heading')).getText()).toEqual('Create/Edit');
	});

});