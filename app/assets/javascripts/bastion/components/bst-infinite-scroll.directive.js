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

/**
 * @ngdoc directive
 * @name Bastion.components.directive:bstInfiniteScroll
 *
 * @description
 *   The infinite scroll directive should be applied to a wrapping div around another element
 *   and provides automatic loading when a user scrolls to the bottom of the element.
 *
 *   Note that the element using the bst-infinite-scroll directive should have it's overflow
 *   set properly.
 *
 * @example
 *   <pre>
 *     <div bst-infinite-scroll="loadMore()" style="height: 100px; overflow-y: auto;">
 *       <p style="height: 1000px;">Hello</p>
 *     </div>
 *   </pre>
 */
angular.module('Bastion.components').directive('bstInfiniteScroll', [function () {
    return {
        scope: {
            data: '=',
            loadMoreFunction: '&bstInfiniteScroll',
            skipInitialLoad: '='
        },
        controller: function ($scope, $element) {

            var result, getScrollHeight, isPromise, loadUntilScroll,
                raw = $element[0];

            $element.bind('scroll', function () {
                var sliderPosition = raw.scrollTop + raw.offsetHeight;
                if (sliderPosition > 0 && sliderPosition >= raw.scrollHeight - 1) {
                    $scope.loadMoreFunction();
                }
            });

            getScrollHeight = function () {
                var scrollHeight = 0;
                $element.children().each(function () {
                    scrollHeight = scrollHeight + $(this).get(0).scrollHeight;
                });
                return scrollHeight;
            };

            isPromise = function (promise) {
                return promise && promise.hasOwnProperty('then');
            };

            loadUntilScroll = function () {
                var loadResult;

                if (getScrollHeight() < $element.height()) {
                    loadResult = $scope.loadMoreFunction();
                    if (isPromise(loadResult)) {
                        loadResult.then(function () {
                            if (getScrollHeight() < $element.height()) {
                                loadUntilScroll();
                            }
                        });
                    }
                }
            };

            if (!$scope.skipInitialLoad && ($scope.data === undefined || $scope.data.length === 0)) {
                result = $scope.loadMoreFunction();
                if (isPromise(result)) {
                    result.then(loadUntilScroll);
                }
            }
        }
    };
}]);
