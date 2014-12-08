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
     *   Handles checking if a state is enabled on state change. If the state is disabled, the user
     *   is redirected to a 404 page.
     */
    function FeaturesInit($rootScope, $window, FeatureFlag) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (!FeatureFlag.stateEnabled(toState.name)) {
                $window.location.href = '/404';
            }
        });
    }

    angular
        .module('Bastion.features')
        .run(FeaturesInit);

    FeaturesInit.$inject = ['$rootScope', '$window', 'FeatureFlag'];

})();
