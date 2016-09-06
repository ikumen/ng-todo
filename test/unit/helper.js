angular.module('YataTestHelper', [])
.factory('testHelper', function() {
	return {
		elFind: function(elm, path) {
			var parts = [];
			if(path && path.trim().length > 0)
				parts = (path || '').split(/\s+/);

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
		},
		noOp: function() {},
	};
});