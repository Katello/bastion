var basePath = __dirname + '/../',
    pluginName = process.cwd().split('/').pop();


module.exports = {
    options: {
        frameworks: ['jasmine'],
        runnerPort: 9100,
        colors: true,
        browsers: ['PhantomJS'],
        reporters: ['progress'],
        singleRun: true,
        preprocessors: {
            'app/assets/javascripts/**/*.html': ['ng-html2js']
        },
        files: [
            basePath + '.tmp/bower_components/jquery/jquery.js',
            basePath + 'vendor/assets/javascripts/bastion/underscore/underscore.js',
            basePath + 'vendor/assets/javascripts/bastion/angular/angular.js',
            basePath + 'vendor/assets/javascripts/bastion/angular-sanitize/angular-sanitize.js',
            basePath + 'vendor/assets/javascripts/bastion/angular-resource/angular-resource.js',
            basePath + 'vendor/assets/javascripts/bastion/angular-uuid4/angular-uuid4.js',
            basePath + 'vendor/assets/javascripts/bastion/angular-blocks/angular-blocks.js',
            basePath + 'vendor/assets/javascripts/bastion/angular-animate/angular-animate.js',
            basePath + 'vendor/assets/javascripts/bastion/angular-bootstrap/ui-bootstrap.js',
            basePath + 'vendor/assets/javascripts/bastion/angular-bootstrap/ui-bootstrap-tpls.js',
            basePath + 'vendor/assets/javascripts/bastion/alchemy/alchemy.js',
            basePath + 'vendor/assets/javascripts/bastion/underscore/underscore.js',
            basePath + 'vendor/assets/javascripts/bastion/angular-ui-router/angular-ui-router.js',
            basePath + 'vendor/assets/javascripts/bastion/angular-gettext/angular-gettext.js',
            basePath + 'vendor/assets/javascripts/bastion/ngUpload/ng-upload.js',
            basePath + '.tmp/bower_components/angular-mocks/angular-mocks.js',

            basePath + 'app/assets/javascripts/bastion/bastion-bootstrap.js',
            basePath + 'app/assets/javascripts/bastion/bastion.module.js',
            basePath + 'app/assets/javascripts/bastion/bastion-resource.factory.js',
            basePath + 'app/assets/javascripts/bastion/i18n/i18n.module.js',
            basePath + 'app/assets/javascripts/bastion/i18n/*.js',
            basePath + 'app/assets/javascripts/bastion/widgets/widgets.module.js',
            basePath + 'app/assets/javascripts/bastion/widgets/*.js',
            basePath + 'app/assets/javascripts/bastion/auth/auth.module.js',
            basePath + 'app/assets/javascripts/bastion/auth/*.js',
            basePath + 'app/assets/javascripts/bastion/utils/utils.module.js',
            basePath + 'app/assets/javascripts/bastion/utils/*.js',
            basePath + 'app/assets/javascripts/bastion/menu/menu.module.js',
            basePath + 'app/assets/javascripts/bastion/menu/*.js',
            basePath + 'app/assets/javascripts/bastion/incubator/*.js',
            basePath + 'app/assets/javascripts/bastion/incubator/**/*.js',

            basePath + 'test/bastion/test-constants.js',
            basePath + 'app/assets/javascripts/bastion/**/*.html',

            // Load modules first
            'app/assets/javascripts/' + pluginName + '/**/*.module.js',
            'app/assets/javascripts/' + pluginName + '/**/*.js',
            'app/assets/javascripts/' + pluginName + '/**/*.html',

            basePath + 'test/test-mocks.module.js',
            'test/**/*test.js'
        ],
        ngHtml2JsPreprocessor: {
            cacheIdFromPath: function (filepath) {
                return filepath.replace(/app\/assets\/javascripts\/bastion\w*\//, '');
            }
        }
    },
    server: {
        autoWatch: true
    },
    unit: {
        singleRun: true
    },
    ci: {
        reporters: ['progress', 'coverage'],
        preprocessors: {
            'app/assets/javascripts/**/*.js': ['coverage']
        },
        coverageReporter: {
            type: 'cobertura',
            dir: 'coverage/'
        }
    }
}
