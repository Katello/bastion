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
