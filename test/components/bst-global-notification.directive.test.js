describe('Directive: bstGlobalNotification', function () {
    var $scope, $compile, PageTitle;

    beforeEach(module(
        'ngSanitize',
        'Bastion.components', 
        'components/views/bst-global-notification.html',
        'components/views/bst-alert.html', 
        'components/views/bst-alerts.html'
    ));

    beforeEach(inject(function(_$compile_, _$rootScope_, _GlobalNotification_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        GlobalNotification = _GlobalNotification_;
    }));

    beforeEach(function () {
        element = angular.element('<div bst-global-notification></div>');
        $compile(element)($scope);
        $scope.$digest();
    });

    it("should display an error message", function () {
        errorMessage = "Something is wrong!!";
        GlobalNotification.setErrorMessage(errorMessage);

        $scope.$digest();
        expect(element.html().indexOf(errorMessage)).toBeGreaterThan(0);
    });

    it("should display a success message", function () {
        successMessage = "success!!";
        GlobalNotification.setSuccessMessage(successMessage);

        $scope.$digest();
        expect(element.html().indexOf(successMessage)).toBeGreaterThan(0);
    });
});
