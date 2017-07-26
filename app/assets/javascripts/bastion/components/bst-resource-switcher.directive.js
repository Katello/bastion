(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name Bastion.components.directive:bstResourceSwitcher
     *
     * @description
     *   Allows switching between resources on the same level.
     */
    function bstResourceSwitcher($breadcrumb, $location, $state, TableCache) {
        function getTableName(url) {
            var tableName = url.split('/');

            if (isFinite(parseInt(tableName[tableName.length - 1], 10))) {
                tableName.pop();
            }

            return tableName.join('-').slice(1);
        }

        return {
            templateUrl: 'components/views/bst-resource-switcher.html',
            link: function (scope) {
                var breadcrumbs = $breadcrumb.getStatesChain(), listUrl;
                scope.table = {rows: []};

                if (breadcrumbs.length > 0) {
                    listUrl = breadcrumbs[breadcrumbs.length - 2].ncyBreadcrumbLink;
                    scope.table = TableCache.getTable(getTableName(listUrl));
                }

                scope.changeResource = function (id) {
                    var currentUrl, nextUrl;
                    currentUrl = $location.path();
                    nextUrl = currentUrl.replace(/\d+([^\d+]*)$/, id + '$1');
                    $location.path(nextUrl);
                };
            }
        };
    }

    angular.module('Bastion.components').directive('bstResourceSwitcher', bstResourceSwitcher);

    bstResourceSwitcher.$inject = ['$breadcrumb', '$location', '$state', 'TableCache'];

})();
