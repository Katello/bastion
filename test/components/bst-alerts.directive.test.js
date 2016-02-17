describe('Directive: bstAlerts', function() {
    var scope,
        compile,
        element,
        elementScope;

    beforeEach(module(
        'ngSanitize',
        'Bastion.components', 
        'components/views/bst-alerts.html', 
        'components/views/bst-alert.html'
    ));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        compile = _$compile_;
        scope = _$rootScope_;
    }));

    beforeEach(function() {
        element = angular.element('<div bst-alerts ' +
            'success-messages="successMessages" ' +
            'info-messages="infoMessages" ' +
            'warning-messages="warningMessages" ' +
            'error-messages="errorMessages"></div>');

        scope.successMessages = [];
        scope.infoMessages = [];
        scope.warningMessages = [];
        scope.errorMessages = [];

        compile(element)(scope);
        scope.$digest();

        elementScope = element.isolateScope();
    });

    it("should display success alerts", function() {
        scope.successMessages = ['hello'];
        scope.$digest();

        expect(elementScope.alerts['success'].length).toBe(1);
        expect(elementScope.alerts['success'][0]).toBe('hello');
    });

    it("should display info alerts", function() {
        scope.infoMessages = ['hello'];
        scope.$digest();

        expect(elementScope.alerts['info'].length).toBe(1);
        expect(elementScope.alerts['info'][0]).toBe('hello');
    });

    it("should display warning alerts", function() {
        scope.warningMessages = ['hello'];
        scope.$digest();

        expect(elementScope.alerts['warning'].length).toBe(1);
        expect(elementScope.alerts['warning'][0]).toBe('hello');
    });

    it("should display success alerts", function() {
        scope.errorMessages = ['hello'];
        scope.$digest();

        expect(elementScope.alerts['danger'].length).toBe(1);
        expect(elementScope.alerts['danger'][0]).toBe('hello');
    });

    it("provides a way to close alerts", function() {
        elementScope.alerts = {success: ['yo!', 'hello'], danger: ['foo']};
        elementScope.closeAlert('success', 1);
        expect(elementScope.alerts['success'].length).toBe(1);
        expect(elementScope.alerts['danger'].length).toBe(1);
    });

});
