'use strict';

var angular = require('angular');
require('angular-mocks');

angular.module('TodoAppTest', [])
	.factory('testHelper', function($q) {
		var deferred = $q.defer();

		function isFunction(f) {
			return (typeof f === 'function');
		}

		/*
		 * Creates a spy on the given object and function (obj.fnName)
		 * with ability to defer (resolve or reject) the functions output
		 * as a promise.
		 * 
		 * @param obj object to spy on
		 * @param fnName name of function on obj to spy on
		 * @param fnOrData data to return as promise. If a function
		 * 		is passed in then run the passed in function and defer 
		 *		it's output, instead of the orig function.
		 * @param isReject indicate where we want to defer.resolve 
		 *		or reject
		 *
		 * @return given obj
		 */
		function createDeferredSpy(obj, fnName, fnOrData, isReject) {
			var doResolveOrReject = isReject ? deferred.reject : deferred.resolve;

			if(isFunction(fnOrData)) {
				obj[fnName] = fnOrData; // overrides original function
			}

			spyOn(obj, fnName).and.callFake(function() {
				if(isFunction(fnOrData)) {
					doResolveOrReject(fnOrData.apply(null, arguments));	
				} else {
					doResolveOrReject(fnOrData);
				}
				return deferred.promise;
			});

			return obj;
		}

		return {
			spyOnAndResolveFn: function(obj, fnName, fnOrData) {
				return createDeferredSpy(obj, fnName, fnOrData, false);
			},
			spyOnAndRejectFn: function(obj, fnName, fnOrData) {
				return createDeferredSpy(obj, fnName, fnOrData, true);
			},
			spyOnAndResolveData: function(obj, fnName, fnOrData) {
				return createDeferredSpy(obj, fnName, fnOrData, false);
			},
			spyOnAndRejectData:function(obj, fnName, fnOrData) {
				return createDeferredSpy(obj, fnName, fnOrData, true);
			}
		};	
	});



