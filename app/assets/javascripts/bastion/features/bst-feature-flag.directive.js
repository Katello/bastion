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
    'use strict';

    /**
     * @ngdoc directive
     * @name Bastion.features.directive:FeatureFlag
     *
     * @description
     *   Handles checking if a given feature is enabled within HTML.
     *
     * @example
     *   HTML:
     *     <button class="btn btn-default"
     *             bst-feature-flag="custom_products"
     *             ui-sref="products.discovery.scan">
     *       <i class="fa fa-screenshot"></i>
     *       {{ "Repo Discovery" | translate }}
     *     </button>
     *
     *   Routes:
     */
    function bstFeatureFlag(ngIfDirective, FeatureFlag) {
        var ngIf = ngIfDirective[0];

        return {
            transclude: ngIf.transclude,
            priority: ngIf.priority,
            terminal: ngIf.terminal,
            restrict: ngIf.restrict,
            scope: true,
            link: function (scope, element, attrs) {
                attrs.ngIf = function () {
                    return FeatureFlag.featureEnabled(attrs['bstFeatureFlag']);
                };

                ngIf.link.apply(ngIf, arguments);
            }
        };
    }

    angular
        .module('Bastion.features')
        .directive('bstFeatureFlag', bstFeatureFlag);

    bstFeatureFlag.$injector = ['ngIfDirective', 'FeatureFlag'];

})();
