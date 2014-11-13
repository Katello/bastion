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
     * @name  Bastion.components.directive:bstOnEnter
     *
     * @description
     *   Allows setting an action to be performed when the user presses the enter button.
     */
    function bstOnEnter() {
        return {
            scope: true,
            link: function (scope, element, attrs) {
                element.bind('keydown keypress', function (event) {
                    if (event.which === 13) {
                        scope.$apply(attrs.bstOnEnter);
                    }
                });
            }
        };
    }

    angular
        .module('Bastion.components')
        .directive('bstOnEnter', bstOnEnter);

})();
