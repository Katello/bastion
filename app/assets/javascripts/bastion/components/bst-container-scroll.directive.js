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
    function getScrollBarWidth() {
        var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
            widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();

        $outer.remove();

        return 100 - widthWithScroll;
    }

    return {
        restrict: 'A',
        compile: function (tElement) {
            tElement.addClass("container-scroll-wrapper");

            return function (scope, element) {
                var windowElement = angular.element($window),
                    bottomPadding = parseInt(element.css('padding-bottom').replace('px', ''), 10),
                    addScroll, newElementHeight;

                addScroll = function () {
                    var windowHeight = windowElement.height(),
                        offset = element.offset().top,
                        hasScrollbar;

                    if (bottomPadding) {
                        offset = offset + bottomPadding;
                    }

                    newElementHeight = windowHeight - offset;

                    if (newElementHeight <= 100) {
                        newElementHeight = 300;
                    }

                    element.outerHeight(newElementHeight);
                    element.height(newElementHeight);

                    // Normalize to 100% width before adding the scrollbar width
                    element.css('width', '100%');

                    hasScrollbar = element.children().height() > element.height();

                    // Set the container width based on the width of the scroll bar
                    if (hasScrollbar) {
                        element.width(element.width() + getScrollBarWidth());
                    }
                };

                windowElement.bind('resize', addScroll);
                $timeout(function () {
                    windowElement.trigger('resize');
                }, 0);
            };
        }
    };
}]);
