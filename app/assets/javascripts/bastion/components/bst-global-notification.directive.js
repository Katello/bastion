/**
 * @ngdoc directive
 * @name Bastion.components.directive:bstGlobalNotification
 *
 * @requires $scope
 * @requires GlobalNotification
 *
 * @description
 *   Provides a way to display global notifications
 */

angular.module("Bastion.components").directive('bstGlobalNotification', function () {
    return {
        templateUrl: 'components/views/bst-global-notification.html',
        scope: {},
        controller: ['$scope', 'GlobalNotification', function ($scope, GlobalNotification) {
            $scope.successMessages = GlobalNotification.successMessages;
            $scope.errorMessages = GlobalNotification.errorMessages;
        }]
    };
});
