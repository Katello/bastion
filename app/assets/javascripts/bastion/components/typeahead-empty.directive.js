/**
 Copyright 2014 Red Hat, Inc.

 This software is licensed to you under the GNU General Public
 License as published by the Free Software Foundation; either version
 2 of the License (GPLv2) or (at your option) any later version.
 There is NO WARRANTY for this software, express or implied,
 including the implied warranties of MERCHANTABILITY,
 NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 have received a copy of GPLv2 along with this software; if not, see
 http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

/**
 * @ngdoc directive
 * @name Bastion.components.directive:typeaheadEmpty
 *
 *
 * @description
 *  Used to support autocompletion on focus, not just after the user types a single character
 *
 * @example
    <input
    typeahead="item as item.label for item in table.autocomplete($viewValue)"
    typeahead-empty />
 */

angular.module('Bastion.components').directive('typeaheadEmpty', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            element.bind('focus', function () {
                if (modelCtrl.$viewValue === undefined || modelCtrl.$viewValue === '') {
                    modelCtrl.$setViewValue(' ');
                }
                else {
                    modelCtrl.$setViewValue(modelCtrl.$viewValue);
                }
            });
        }
    };
});
