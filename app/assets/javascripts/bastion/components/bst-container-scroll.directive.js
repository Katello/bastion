/**
 * @ngdoc directive
 * @name Bastion.components.directive:bstContainerScroll
 * @restrict A
 *
 * @requires $window
 * @requires $timeout
 *
 * @description
 *   The container scroll directive should be applied to a wrapping div around an element that
 *   you wish to have scrolling capabilities that is outside the standard browser flow.
 *
 * @example
 *   <pre>
       <div bst-container-scroll></div>
     </pre>
 */
angular.module('Bastion.components').directive('bstContainerScroll', ['$window', '$timeout', function ($window, $timeout) {
    return {
        restrict: 'A',
        compile: function (tElement) {
            tElement.addClass("container-scroll-wrapper");

            return function (scope, element) {
                var windowElement = angular.element($window),
                    bottomPadding = parseInt(element.css('padding-bottom').replace('px', ''), 10),
                    addScroll;

                addScroll = function () {
                    var windowHeight = windowElement.height(),
                        offset = element.offset().top;

                    if (bottomPadding) {
                        offset = offset + bottomPadding;
                    }

                    element.outerHeight(windowHeight - offset);
                    element.height(windowHeight - offset);
                };

                windowElement.bind('resize', addScroll);
                $timeout(function () {
                    windowElement.trigger('resize');
                }, 0);
            };
        }
    };
}]);
