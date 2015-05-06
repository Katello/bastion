/**
 * @ngdoc directive
 * @name Bastion.components.directive:bstAlerts
 *
 * @description
 *   Simple directive for encapsulating alert displays.
 *
 * @example
 *   <pre>
 *     <div bst-alerts
 *          successMessages="successMessages"
 *          errorMessages="errorMessages">
 *     </div>
 */
angular.module('Bastion.components').directive('bstAlerts', function () {
    return {
        templateUrl: 'components/views/bst-alerts.html',
        scope: {
            successMessages: '=',
            infoMessages: '=',
            warningMessages: '=',
            errorMessages: '='
        },

        link: function (scope) {
            scope.alerts = {};
            scope.types = ['success', 'info', 'warning', 'danger'];

            function handleMessages(type, messages) {
                scope.alerts[type] = messages;
            }

            scope.$watch('successMessages', function (messages) {
                handleMessages('success', messages);
            }, true);

            scope.$watch('infoMessages', function (messages) {
                handleMessages('info', messages);
            }, true);

            scope.$watch('warningMessages', function (messages) {
                handleMessages('warning', messages);
            }, true);

            scope.$watch('errorMessages', function (messages) {
                handleMessages('danger', messages);
            }, true);

            scope.closeAlert = function (type, index) {
                scope.alerts[type].splice(index, 1);
            };
        }
    };
});
