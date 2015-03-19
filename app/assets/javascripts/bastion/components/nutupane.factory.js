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
 * @ngdoc service
 * @name  Bastion.components.service:Nutupane
 *
 * @requires $location
 * @requires $q
 * @requires $timeout
 *
 * @description
 *   Defines the Nutupane factory for adding common functionality to the Nutupane master-detail
 *   pattern.  Note that the API Nutupane uses must provide a response of the following structure:
 *
 *   {
 *      page: 1,
 *      subtotal: 50,
 *      total: 100,
 *      results: [...]
 *   }
 *
 * @example
 *   <pre>
       angular.module('example').controller('ExampleController',
           ['Nutupane', function (Nutupane)) {
               var nutupane                = new Nutupane(ExampleResource);
               $scope.table                = nutupane.table;
           }]
       );
    </pre>
 */
angular.module('Bastion.components').factory('Nutupane',
    ['$location', '$q', '$timeout', function ($location, $q, $timeout) {
        var Nutupane = function (resource, params, action) {
            var self = this;
            params = params || {};

            self.searchKey = action ? action + 'Search' : 'search';

            self.table = {
                action: action || 'queryPaged',
                params: params,
                resource: resource,
                rows: [],
                searchTerm: $location.search()[self.searchKey],
                initialLoad: true
            };

            // Set default resource values
            resource.page = 0;
            resource.subtotal = "0";
            resource.total = "0";
            resource.results = [];

            self.load = function (replace) {
                var deferred = $q.defer(),
                    table = self.table;

                replace = replace || false;
                table.working = true;

                if (table.initialLoad) {
                    table.refreshing = true;
                    table.initialLoad = false;
                }

                params.page = table.resource.page + 1;
                params.search = table.searchTerm || "";
                params.search = self.searchTransform(params.search);

                resource[table.action](params, function (response) {

                    angular.forEach(response.results, function (row) {
                        row.selected = table.allResultsSelected;
                    });

                    if (replace) {
                        table.rows = response.results;
                    } else {
                        table.rows = table.rows.concat(response.results);
                    }
                    table.resource.page = parseInt(response.page, 10);

                    if (table.initialSelectAll) {
                        table.selectAll(true);
                        table.initialSelectAll = false;
                    }

                    // This $timeout is necessary to cause a digest cycle
                    // in order to prevent loading two sets of results.
                    $timeout(function () {
                        deferred.resolve(response);
                        table.resource = response;
                        table.resource.page = parseInt(response.page, 10);

                        if (self.selectAllMode) {
                            table.selectAll(true);
                        }
                        table.resource.offset = table.rows.length;
                    }, 0);
                    table.working = false;
                    table.refreshing = false;
                });

                return deferred.promise;
            };

            self.getParams = function () {
                return params;
            };

            self.table.autocomplete = function (term) {
                var data, promise, localParams;

                if (resource.autocomplete) {
                    localParams = self.getParams();
                    localParams.search = term;
                    data = resource.autocomplete(params);
                } else {
                    data = self.table.fetchAutocomplete(term);
                }

                promise = data.$promise;
                if (promise) {
                    return promise.then(function (response) {
                        return self.table.transformScopedSearch(response);
                    });
                }

                return data;
            };

            self.table.transformScopedSearch = function (results) {
                var rows = [],
                    categoriesFound = [];
                angular.forEach(results, function (row) {
                    if (row.category && row.category.length > 0) {
                        if (categoriesFound.indexOf(row.category) === -1) {
                            categoriesFound.push(row.category);
                            rows.push({category: row.category, isCategory: true});
                        }
                    }
                    rows.push(row);
                });

                return rows;
            };

            //Overridable by real controllers, but default to nothing
            self.table.fetchAutocomplete = function () {
                return [];
            };

            self.enableSelectAllResults = function () {
                self.table.selectAllResultsEnabled = true;
                self.table.allResultsSelected = false;
            };

            self.setParams = function (newParams) {
                params = newParams;
            };

            self.addParam = function (param, value) {
                params[param] = value;
            };

            self.searchTransform = function (term) {
                return term;
            };

            self.query = function () {
                var table = self.table;
                if (table.rows.length === 0) {
                    table.resource.page = 0;
                }
                return self.load();
            };

            self.refresh = function () {
                self.table.refreshing = true;
                self.table.resource.page = 0;
                return self.load(true);
            };

            self.removeRow = function (id, field) {
                var foundItem, table = self.table;

                field = field || 'id';

                angular.forEach(table.rows, function (item) {
                    if (item[field] === id) {
                        foundItem = item;
                    }
                });

                table.rows = _.reject(table.rows, function (item) {
                    return item[field] === id;
                }, this);

                table.resource.total = table.resource.total - 1;
                table.resource.subtotal = table.resource.subtotal - 1;
                if (foundItem && foundItem.selected) {
                    table.numSelected = table.numSelected - 1;
                }

                return self.table.rows;
            };

            self.getAllSelectedResults = function (identifier) {
                var selected, selectedRows;
                identifier = identifier || 'id';
                selected = {
                    included: {
                        ids: [],
                        resources: [],
                        search: null,
                        params: params
                    },
                    excluded: {
                        ids: []
                    }
                };

                if (self.table.allResultsSelected) {
                    selected.included.search = self.table.searchTerm || '';
                    selected.excluded.ids = _.pluck(self.getDeselected(), identifier);
                } else {
                    selectedRows = self.table.getSelected();
                    selected.included.ids = _.pluck(selectedRows, identifier);
                    selected.included.resources = selectedRows;
                }
                return selected;
            };

            self.getDeselected = function () {
                var deselectedRows = [];
                angular.forEach(self.table.rows, function (row, rowIndex) {
                    if (row.selected !== true) {
                        deselectedRows.push(self.table.rows[rowIndex]);
                    }
                });
                return deselectedRows;
            };

            self.table.search = function (searchTerm) {
                $location.search(self.searchKey, searchTerm);
                self.table.searchTerm = searchTerm;
                self.table.resource.page = 1;
                self.table.rows = [];
                self.table.closeItem();
                self.table.selectAllResults(false);

                if (!self.table.working) {
                    self.table.refreshing = true;
                    self.query();
                }
            };

            // Must be overridden
            self.table.closeItem = function () {
                if (!self.masterOnly) {
                    throw "Nutupane closeItem not implemented. If you are using Nutupane functionality with master-detail please pass 'masterOnly' to your Nutupane declaration";
                }
            };

            self.table.replaceRow = function (row) {
                var index, selected;
                index = null;
                angular.forEach(self.table.rows, function (item, itemIndex) {
                    if (item.id === row.id) {
                        index = itemIndex;
                        selected = item.selected;
                    }
                });

                if (index >= 0) {
                    row.selected = selected; //Preserve selectedness
                    self.table.rows[index] = row;
                }
            };

            self.table.addRow = function (row) {
                self.table.rows.unshift(row);
                self.table.resource.subtotal += 1;
                self.table.resource.total += 1;
            };

            self.table.nextPage = function () {
                var table = self.table;
                if (table.working || !table.hasMore()) {
                    return false;
                }
                return self.query();
            };

            self.table.hasMore = function () {
                var length = self.table.rows.length,
                    subtotal = self.table.resource.subtotal,
                    hasMore = false,
                    justBegun;

                if (!subtotal) {
                    hasMore = false;
                } else {
                    justBegun = (length === 0 && subtotal !== 0);
                    hasMore = (length < subtotal) || justBegun;
                }
                return hasMore;
            };

            // Wraps the table.selectAll() function if selectAllResultsEnabled is not set
            // Otherwise provides expanded functionality

            self.table.selectAllResults = function (selectAll) {
                if (self.table.allSelected() || selectAll !== 'undefined') {
                    self.table.selectAll(selectAll);
                } else if (selectAll) {
                    self.table.initialSelectAll = true;
                }

                if (self.table.selectAllResultsEnabled) {
                    if (selectAll) {
                        self.table.disableSelectAll();
                    } else {
                        self.table.enableSelectAll();
                    }

                    self.table.allResultsSelected = selectAll;
                    self.table.numSelected = selectAll ? self.table.resource.subtotal : 0;
                }
            };

            self.table.allResultsSelectCount = function () {
                return self.table.resource.subtotal - self.getDeselected().length;
            };

            self.table.sortBy = function (column) {
                var sort = self.table.resource.sort;
                if (!column) {
                    return;
                }

                params["sort_by"] = column.id;
                if (column.id === sort.by) {
                    params["sort_order"] = (sort.order === 'ASC') ? 'DESC' : 'ASC';
                } else {
                    params["sort_order"] = 'ASC';
                }

                column.sortOrder = params["sort_order"];
                column.active = true;
                self.table.rows = [];
                self.query();
            };
        };
        return Nutupane;
    }]
);
