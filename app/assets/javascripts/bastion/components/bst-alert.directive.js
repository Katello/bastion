/**
 * @ngdoc directive
 * @name Bastion.components.directive:bstAlert
 *
 * @description
 *   Simple directive for encapsulating an alert display.
 *
 * @example
 *   <pre>
 *     <div bst-alert="success"></div>
 *   </pre>
 */
angular.module('Bastion.components').directive('bstAlert', function () {
    return {
        templateUrl: 'components/views/bst-alert.html',
        transclude: true,
        scope: {
            type: '@bstAlert',
            close: '&'
        },
        controller: function ($scope, $attrs) {
            $scope.closeable = 'close' in $attrs;
        }
    };
});
