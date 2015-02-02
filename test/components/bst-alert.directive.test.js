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
 */

describe('Directive: bstAlert', function() {
    var scope,
        compile,
        element,
        elementScope;

    beforeEach(module('Bastion.components', 'components/views/bst-alert.html'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        compile = _$compile_;
        scope = _$rootScope_;
    }));

    beforeEach(function() {
        element = angular.element('<div bst-alert="info"></div>');

        compile(element)(scope);
        scope.$digest();

        elementScope = element.isolateScope();
    });

    it("should display an alert", function() {
        scope.successMessages = ['hello'];
        scope.$digest();

        expect(element.find('.alert').length).toBe(1);
    });

    it("should display a close icon if a close function is provided", function () {
        element = angular.element('<div bst-alert="info" close="close()"></div>');

        compile(element)(scope);
        scope.$digest();
        elementScope = element.isolateScope();

        expect(elementScope.closeable).toBe(true);
    });
});
