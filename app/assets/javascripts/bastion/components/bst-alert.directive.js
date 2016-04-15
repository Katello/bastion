/**
 * @ngdoc directive
 * @name Bastion.components.directive:bstAlert
 *
 * @requires $animate
 * @requires $timeout
 *
 * @description
 *   Simple directive for encapsulating an alert display.
 *
 * @example
 *   <pre>
 *     <div bst-alert="success"></div>
 *   </pre>
 */
angular.module('Bastion.components').directive('bstAlert', ['$animate', '$timeout', function ($animate, $timeout) {
    var SUCCESS_FADEOUT = 3000;

    return {
        templateUrl: 'components/views/bst-alert.html',
        transclude: true,
        scope: {
            type: '@bstAlert',
            close: '&'
        },
        link: function (scope, element, attrs) {
            scope.closeable = 'close' in attrs;

            // Fade out success alerts after five seconds
            if (scope.type === 'success') {
                $timeout(function () {
                    $animate.leave(element.find('.alert'), scope.close);
                }, SUCCESS_FADEOUT);
            }
        }
    };
}]);
