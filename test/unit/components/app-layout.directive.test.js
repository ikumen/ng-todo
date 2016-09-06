describe('Yata, app-layout directive', function() {

	var elm,
		scope,
		utils;

	beforeEach(module('Yata'));
	beforeEach(module('YataTestHelper'));
	beforeEach(module('/components/app-layout.template.html'))

	beforeEach(inject(function($rootScope, $compile, elmUtils) {

		elm = angular.element(
			'<app-layout>' +
				'<app-layout-header>' +
					'This is the header' +
				'</app-layout-header>' +
				'<app-layout-body>' +
					'This is the body' + 
				'</app-layout-body>' +
			'</app-layout>'
		);

		utils = elmUtils;
		scope = $rootScope.$new();
		$compile(elm)(scope);
		scope.$digest();
	}));

	it('should render the page with app layout', function() {
		var header = utils.find(elm, 'header app-layout-header 0');
		expect(header.text()).toBe('This is the header');

		var body = utils.find(elm, 'main div app-layout-body 0');
		expect(body.text()).toBe('This is the body');
	});

})