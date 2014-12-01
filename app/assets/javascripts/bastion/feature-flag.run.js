/**
 * Copyright 2014 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/


(function () {

    /**
     * @ngdoc service
     * @name Bastion.run:FeatureFlag
     *
     * @description
     *   Handles checking if a given feature is enabled. Provides this functionality on
     *   the root scope and also checks routes to send the user to a 403.
     *
     * @example
     *   HTML:
     *     <button class="btn btn-default"
     *             ng-if="featureEnabled('custom_products')"
     *             ui-sref="products.discovery.scan">
     *       <i class="icon-screenshot"></i>
     *       {{ "Repo Discovery" | translate }}
     *     </button>
     *
     *   Routes:
     *     state("products.discovery.create", {
     *         url: '/products/discovery/scan/create',
     *         feature: 'custom_products',
     *         templateUrl: 'products/discovery/views/discovery-create.html',
     *         controller: 'DiscoveryFormController'
     *     })
     */
    function FeatureFlag($rootScope, $window, Features) {

        $rootScope.featureEnabled = function (flag) {
            var enabled = true;

            if (Features[flag] !== undefined) {
                enabled = Features[flag];
            }

            return enabled;
        };

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var feature = toState.feature;

            if (feature !== undefined && !$rootScope.featureEnabled(feature)) {
                $window.location.href = '/katello/403';
            }
        });
    }

    angular
        .module('Bastion')
        .run(FeatureFlag);

    FeatureFlag.$inject = ['$rootScope', '$window', 'Features'];

})();
