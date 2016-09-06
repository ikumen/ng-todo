// Karma configuration
// Generated on Fri Aug 19 2016 11:04:22 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'app/lib/angular/angular.min.js',
        'app/lib/angular-route/angular-route.min.js',
        'app/lib/material-design-lite/material.min.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'app/app.js',
        'app/services/**/*.js',
        'app/components/**/*.js',
        'app/views/**/*.js',
        'test/unit/**/*.js',
        // 'app/components/**/*.js',
        // 'test/unit/helper.js',
        // 'test/unit/**/*.js'
        'app/components/**/*.html'        
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/components/**/*.html': ['ng-html2js']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['PhantomJS'],
    browsers: ['Chrome'],



    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    ngHtml2JsPreprocessor: {
        // strip this from the file path
        stripPrefix: 'app',
        //stripSuffix: '.ext',
        // prepend this to the
        //prependPrefix: 'served/',

        // or define a custom transform function
        // - cacheId returned is used to load template
        //   module(cacheId) will return template at filepath
        //cacheIdFromPath: function(filepath) {
            // example strips 'public/' from anywhere in the path
            // module(app/templates/template.html) => app/public/templates/template.html
            //var cacheId = filepath.strip('public/', '');
            //return cacheId;
        //},

        // - setting this option will create only a single module that contains templates
        //   from all the files, so you can load them all with module('foo')
        // - you may provide a function(htmlPath, originalPath) instead of a string
        //   if you'd like to generate modules dynamically
        //   htmlPath is a originalPath stripped and/or prepended
        //   with all provided suffixes and prefixes
        //moduleName: 'foo'
    }
  })
}
