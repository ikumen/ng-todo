angular.module('Yata')
.directive('appLayout', function() {
	return {
		transclude: {
			header: 'appLayoutHeader',
			body: 'appLayoutBody'
		},
		replace: true,
		templateUrl: '/components/app-layout.template.html'
	}
});