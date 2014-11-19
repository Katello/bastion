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

describe('Directive: typeahead-empty', function() {
    var scope,
        compile,
        element,
        elementScope;


    beforeEach(module(
        'Bastion.components'
    ));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        compile = _$compile_;
        scope = _$rootScope_;
    }));

    beforeEach(function() {
        element = angular.element('<input ng-model="myInput" type="text" typeahead-empty />');

        compile(element)(scope);
        scope.$digest();

        elementScope = element.isolateScope();
    });

    it("should adjust empty string", function() {
        scope.myInput = '';
        scope.$digest();
        element.triggerHandler('focus');

        expect(scope.myInput).toBe(' ');
    });

    it("should adjust undefined", function() {
        scope.myInput = undefined;
        scope.$digest();
        element.triggerHandler('focus');

        expect(scope.myInput).toBe(' ');
    });

    it("should not adjust otherss", function() {
        scope.myInput = 'foo';
        scope.$digest();
        element.triggerHandler('focus');

        expect(scope.myInput).toBe('foo');
    });
});
