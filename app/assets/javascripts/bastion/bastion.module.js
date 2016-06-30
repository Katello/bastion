/**
 * @ngdoc module
 * @name  Bastion
 *
 * @description
 *   Base module that defines the Katello module namespace and includes any thirdparty
 *   modules used by the application.
 */
angular.module('Bastion', [
    'ui.router',
    'ngResource',
    'Bastion.i18n',
    'Bastion.components'
]);

/**
 * @ngdoc config
 * @name  Bastion.config
 *
 * @requires $httpProvider
 * @requires $urlRouterProvider
 * @requires $locationProvider
 * @requires $provide
 * @requires BastionConfig
 *
 * @description
 *   Used for establishing application wide configuration such as adding the Rails CSRF token
 *   to every request and adding Xs to translated strings.
 */
angular.module('Bastion').config(
    ['$httpProvider', '$urlRouterProvider', '$locationProvider', '$provide', 'BastionConfig',
    function ($httpProvider, $urlRouterProvider, $locationProvider, $provide, BastionConfig) {
        var oldBrowserBastionPath = '/bastion#';

        $httpProvider.defaults.headers.common = {
            Accept: 'application/json, text/plain, version=2; */*',
            'X-CSRF-TOKEN': angular.element('meta[name=csrf-token]').attr('content')
        };

        $urlRouterProvider.rule(function ($injector, $location) {
            var $sniffer = $injector.get('$sniffer'),
                $window = $injector.get('$window'),
                path = $location.path();

            if (!$sniffer.history) {
                $window.location.href = oldBrowserBastionPath + $location.path();
            }

            if (/^\/katello($|\/)/.test(path)) {
                $window.location.href = $location.url();
                $window.location.reload();
            }

            // removing trailing slash to prevent endless redirect
            if (path[path.length - 1] === '/') {
                return path.slice(0, -1);
            }
        });

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $window = $injector.get('$window'),
                $state = $injector.get('$state'),
                parentState = $location.path().split('/')[1].replace('_', '-'),
                url = $location.absUrl();

            // ensure we don't double encode +s
            url = url.replace(/%2B/g, "+");

            // Remove the old browser path if present
            url = url.replace(oldBrowserBastionPath, '');

            if ($state.get(parentState)) {
                $window.location.href = '/404';
            } else {
                $window.location.href = url;
            }
            return $location.path();
        });

        $locationProvider.html5Mode({enabled: true, requireBase: false});

        $provide.factory('PrefixInterceptor', ['$q', '$templateCache', function ($q, $templateCache) {
            return {
                request: function (config) {
                    if (config.url.indexOf('.html') !== -1) {
                        if (angular.isUndefined($templateCache.get(config.url))) {
                            config.url = '/' + config.url;
                        }
                    }

                    return config || $q.when(config);
                }
            };
        }]);

        // Add Xs around translated strings if the config value mark_translated is set.
        if (BastionConfig.markTranslated) {
            $provide.decorator('gettextCatalog', ["$delegate", function ($delegate) {
                var getString = $delegate.getString;

                $delegate.getString = function (string, n) {
                    return 'X' + getString.apply($delegate, [string, n]) + 'X';
                };
                return $delegate;
            }]);
        }

        $httpProvider.interceptors.push('PrefixInterceptor');
    }]
);


/**
 * @ngdoc run
 * @name Bastion.run
 *
 * @requires $rootScope
 * @requires $state
 * @requires $stateParams
 * @requires gettextCatalog
 * @requires currentLocale
 * @requires $location
 * @requires $window
 * @requires PageTitle
 * @requires markActiveMenu
 *
 * @description
 *   Set up some common state related functionality and set the current language.
 */
angular.module('Bastion').run(['$rootScope', '$state', '$stateParams', 'gettextCatalog', 'currentLocale', '$location', '$window', 'PageTitle', 'markActiveMenu',
    function ($rootScope, $state, $stateParams, gettextCatalog, currentLocale, $location, $window, PageTitle, markActiveMenu) {
        var fromState, fromParams, orgSwitcherRegex;

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.transitionTo = $state.transitionTo;

        $rootScope.isState = function (stateName) {
            return $state.is(stateName);
        };

        $rootScope.stateIncludes = function (state, params) {
            if (angular.isDefined(params)) {
                angular.forEach(params, function (value, key) {
                    params[key] = value.toString();
                });
            }

            return $state.includes(state, params);
        };

        $rootScope.transitionBack = function () {
            if (fromState) {
                $state.transitionTo(fromState, fromParams);
            }
        };

        $rootScope.taskUrl = function (taskId) {
            return "/foreman_tasks/tasks/" + taskId;
        };

        // Set the current language
        gettextCatalog.currentLanguage = currentLocale;
        $rootScope.$on('$stateChangeStart',
            function () {
                //save location.search so we can add it back after transition is done
                this.locationSearch = $location.search().search;
            }
        );

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromStateIn, fromParamsIn) {
                //restore all query string parameters back to $location.search
                if (this.locationSearch) {
                    $location.search('search', this.locationSearch);
                }

                //Record our from state, so we can transition back there
                if (!fromStateIn.abstract) {
                    fromState = fromStateIn;
                    fromParams = fromParamsIn;
                }

                //Pop the last page title if it's not the outermost title (i.e. parent state)
                if (PageTitle.titles.length > 1) {
                    PageTitle.resetToFirst();
                }

                //Set the active menu item in Foreman
                markActiveMenu();
            }
        );

        // Prevent angular from handling org/location switcher URLs
        orgSwitcherRegex = new RegExp("/(organizations|locations)/(.+/)*(select|clear)");
        $rootScope.$on('$locationChangeStart', function (event, newUrl) {
            if (newUrl.match(orgSwitcherRegex)) {
                event.preventDefault();
                $window.location.href = newUrl;
            }
        });
    }
]);
