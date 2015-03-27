/**
 * @ngdoc directive
 * @name Bastion.components.directive:nutupaneTable
 * @restrict A
 *
 * @require $compile
 *
 * @description
 *
 * @example
 */
angular.module('Bastion.components').directive('nutupaneTable', ['$compile', '$window', function ($compile, $window) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var originalTable, clonedTable, clonedThs,
                bstTableName = element.attr('bst-table'),
                windowElement = angular.element($window);

            function buildTable() {
                var rowSelect;

                element.find('.cloned-nutupane-table').remove();

                originalTable = element.find('table');
                clonedTable = originalTable.clone();

                if (!bstTableName) {
                    bstTableName = element.find('[bst-table]').attr('bst-table');
                }

                clonedTable.attr('ng-show', bstTableName + '.rows.length > 0');
                clonedTable.removeAttr("nutupane-table");
                clonedTable.addClass("cloned-nutupane-table");
                clonedTable.find('tbody').remove();
                clonedTable.find('thead tr').append('<th class="table-header-spacer"></th>');

                originalTable.find('thead').hide();

                element.prepend(clonedTable);
                $compile(element.find('.cloned-nutupane-table'))(scope);

                // Need to remove duplicate row-select created by second $compile
                rowSelect = element.find(".row-select")[0];
                if (rowSelect) {
                    angular.element(rowSelect).remove();
                }

                windowElement.bind('resize', function () {
                    if (element.find('[bst-container-scroll]').length > 0) {
                        clonedTable.find('thead tr th:last-child').width(element.width() - element.find('[bst-container-scroll]')[0].scrollWidth);
                    }
                });

                // Compile each cloned th individually with original th scope
                // so sort will work.
                clonedThs = element.find('.cloned-nutupane-table th');
                angular.forEach(originalTable.find('th'), function (th, index) {
                    $compile(clonedThs[index])(angular.element(th).scope());
                });

                originalTable.bind("DOMNodeInserted", function () {
                    windowElement.trigger('resize');
                });

                originalTable.bind("DOMNodeInsertedIntoDocument", function () {
                    windowElement.trigger('resize');
                });
            }

            scope.$on("$stateChangeSuccess", function (event, newState, newParams, oldState) {
                // Only clone the table if the collapsed value changed or it's the first time.
                if (newState.collapsed !== oldState.collapsed || !oldState.name) {
                    buildTable();
                } else {
                    element.find("table:not(.cloned-nutupane-table)").find('thead').hide();
                }
            });

            buildTable();
        }
    };
}]);
