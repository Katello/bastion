describe('Factory: Nutupane', function() {
    var $timeout,
        $location,
        $rootScope,
        Resource,
        TableCache,
        expectedResult,
        Nutupane;

    beforeEach(module('Bastion.components'));

    beforeEach(module(function ($provide) {
        TableCache = {
            getTable: function () {
            },
            setTable: function () {
            },
            removeTable: function () {
            }
        };

        $provide.value('TableCache', TableCache);
    }));

    beforeEach(module(function() {
        expectedResult = [{id: 2, value: "value2"}, {id:3, value: "value3"}];
        Resource = {
            queryPaged: function(params, callback) {
                var result = {results: expectedResult};
                if (callback) {
                    callback(result);
                }
                return result;
            },
            customAction: function() {},
            total: 10,
            subtotal: 8,
            offset: 5,
            sort: {
                by: "description",
                order: "ASC"
            }
        };
    }));

    beforeEach(inject(function(_$location_, _$timeout_, _Nutupane_, _$rootScope_) {
        $location = _$location_;
        $timeout = _$timeout_;
        Nutupane = _Nutupane_;
        $rootScope = _$rootScope_;
    }));

    describe("adds additional functionality to the Nutupane table by", function() {
        var nutupane;

        beforeEach(function() {
            nutupane = new Nutupane(Resource);
            nutupane.table.working = false;
            nutupane.table.selectAll = function() {};
            nutupane.table.getSelected = function() {};
            nutupane.table.disableSelectAll = function () { };
            nutupane.table.enableSelectAll = function () { };
            nutupane.table.allSelected = function () { return true; };
            nutupane.table.rows = [{id: 0, value: "value0"}, {id:1, value: "value1"}];
            nutupane.table.resource = Resource;
        });

        it("providing a method to fetch records for the table", function() {
            var expected = nutupane.table.rows.concat(expectedResult);

            spyOn(Resource, 'queryPaged').and.callThrough();
            nutupane.query();

            expect(Resource.queryPaged).toHaveBeenCalled();
            expect(nutupane.table.rows.length).toBe(4);
            angular.forEach(nutupane.table.rows, function(value, index) {
                expect(value).toBe(expected[index]);
            });
        });

        it("providing a method to refresh the table", function() {
            spyOn(Resource, 'queryPaged').and.callThrough();
            spyOn(TableCache, 'removeTable');

            nutupane.refresh();

            expect(TableCache.removeTable).toHaveBeenCalled();
            expect(Resource.queryPaged).toHaveBeenCalled();
            expect(nutupane.table.rows).toBe(expectedResult);
        });

        it("provides a way to invalidate the table", function () {
            spyOn(TableCache, 'removeTable');
            nutupane.invalidate();
            expect(TableCache.removeTable).toHaveBeenCalled();
        });

        it("providing a method to perform a search", function() {
            spyOn(Resource, 'queryPaged');
            nutupane.table.closeItem = function() {};

            nutupane.table.search();

            expect(Resource.queryPaged).toHaveBeenCalled();
        });

        it("refusing to perform a search if the table is currently fetching", function() {
            spyOn(Resource, 'queryPaged');
            nutupane.table.closeItem = function() {};
            nutupane.table.working = true;

            nutupane.table.search();

            expect(Resource.queryPaged).not.toHaveBeenCalled();
        });

        it("setting the search parameter in the URL when performing a search", function() {
            spyOn(Resource, 'queryPaged');
            nutupane.table.closeItem = function() {};
            nutupane.table.working = true;

            nutupane.table.search("Find Me");

            expect($location.search().search).toEqual("Find Me");
        });

        it("can clear the search", function () {
            spyOn(nutupane.table, 'search');

            nutupane.table.clearSearch();

            expect(nutupane.table.search).toHaveBeenCalledWith(null);
            expect(nutupane.table.searchCompleted).toBe(true);
        });

        it("enforcing the user of this factory to define a closeItem function", function() {
            expect(nutupane.table.closeItem).toThrow();
        });

        it("updates a single occurrence of a row within the list of rows.", function() {
            var newRow = {id:0, value:"new value", anotherValue: "value"};
            nutupane.query();
            nutupane.table.replaceRow(newRow);
            expect(nutupane.table.rows[0]).toBe(newRow);
        });

        it("removes a single occurrence of a row within the list of rows.", function() {
            var row = {id:0, value: "value2"};
            nutupane.removeRow(row.id);
            expect(nutupane.table.rows.length).toBe(1);
            expect(nutupane.table.rows).not.toContain(row);
        });

        it("decrements num selected if removed row is selected.", function() {
               var row = nutupane.table.rows[0];
               row.selected = true;
               nutupane.table.numSelected = 1;

               nutupane.removeRow(row.id);
               expect(nutupane.table.rows.length).toBe(1);
               expect(nutupane.table.rows).not.toContain(row);
               expect(nutupane.table.numSelected).toBe(0);
        });

        it("providing a method that fetches more data", function() {
            nutupane.table.rows = [];
            spyOn(Resource, 'queryPaged');

            nutupane.table.nextPage();

            expect(Resource.queryPaged).toHaveBeenCalled();
        });

        it("refusing to fetch more data if the table is currently working", function() {
            spyOn(Resource, 'queryPaged');
            nutupane.table.working = true;
            nutupane.table.nextPage();

            expect(Resource.queryPaged).not.toHaveBeenCalled();
        });

        it("refusing to fetch more data if the subtotal of records equals the number of rows", function() {
            spyOn(Resource, 'queryPaged');
            nutupane.table.rows = new Array(8);
            nutupane.table.nextPage();

            expect(Resource.queryPaged).not.toHaveBeenCalled();
        });

        it("provides a way to add an individual row", function() {
            nutupane.table.rows = new Array(8);
            nutupane.table.addRow('');

            expect(nutupane.table.rows.length).toBe(9);
        });

        it("provides a way to enable select all results", function(){
           nutupane.enableSelectAllResults();
           expect(nutupane.table.selectAllResultsEnabled).toBe(true);
        });

        it("provides a way to select all results", function() {
            nutupane.enableSelectAllResults();
            spyOn(nutupane.table, 'selectAll');
            spyOn(nutupane.table, 'disableSelectAll');

            nutupane.table.selectAllResults(true);

            expect(nutupane.table.selectAll).toHaveBeenCalledWith(true);
            expect(nutupane.table.disableSelectAll).toHaveBeenCalled();
            expect(nutupane.table.allResultsSelected).toBe(true);
            expect(nutupane.table.numSelected).toBe(nutupane.table.resource.subtotal);
        });

        it("provides a way to de-select all results", function(){
            nutupane.enableSelectAllResults();
            nutupane.table.numSelected = 0;
            spyOn(nutupane.table, 'selectAll');
            spyOn(nutupane.table, 'enableSelectAll');
            nutupane.table.selectAllResults(false);

            expect(nutupane.table.selectAll).toHaveBeenCalledWith(false);
            expect(nutupane.table.enableSelectAll).toHaveBeenCalled();
            expect(nutupane.table.allResultsSelected).toBe(false);
            expect(nutupane.table.numSelected).toBe(0);
        });

        it("provides a way to get deselected items", function(){
            var deselected;
            nutupane.enableSelectAllResults();
            nutupane.table.rows = expectedResult;
            angular.forEach(nutupane.table.rows, function(item, itemIndex) {
                item.selected = true;
            });
            nutupane.table.rows[0].selected = false
            deselected = nutupane.getDeselected();

            expect(deselected.length).toBe(1);
            expect(deselected[0]).toBe(nutupane.table.rows[0]);
        });

        it("provides a way to retrieve selected result items", function(){
            var results;
            nutupane.enableSelectAllResults();
            nutupane.table.selectAllResults(true);
            nutupane.table.searchTerm = "FOO"

            angular.forEach(nutupane.table.rows, function(item, itemIndex) {
                item.selected = true;
            });
            nutupane.table.rows[0].selected = false;
            results = nutupane.getAllSelectedResults('id');
            expect(results.excluded.ids[0]).toBe(nutupane.table.rows[0]['id']);
            expect(results.included.search).toBe("FOO");
        });

        it("provides a way to translate scoped search queries", function() {
            var translated,
                data = [{label: 'bar', category: 'foo'},
                        {label: 'bar2', category: 'foo'}];

            translated = nutupane.table.transformScopedSearch(data);
            expect(translated.length).toBe(3);
            expect(translated[0].isCategory).toBeTruthy();
            expect(translated[0].category).toBe('foo');
            expect(translated[1]).toBe(data[0]);
            expect(translated[2]).toBe(data[1]);
        });

        it("provides a way to change the searchKey", function() {
            nutupane.setSearchKey("keyFoo");
            expect(nutupane.searchKey).toBe("keyFoo");
        });

        it("autocompletes using the original resource if possible", function() {
            var data;
            Resource.autocomplete = function() {return ["foo"]};
            spyOn(Resource, 'autocomplete').and.callThrough();

            data = nutupane.table.autocomplete();
            expect(Resource.autocomplete).toHaveBeenCalled();
            expect(data[0]).toBe("foo");
        });

        it("autocompletes using fetchAutocomplete if resource doesn't support autocomplete", function() {
            var data;
            nutupane.table.fetchAutocomplete = function() {return ['bar']};
            spyOn(nutupane.table, 'fetchAutocomplete').and.callThrough();

            data = nutupane.table.autocomplete();
            expect(nutupane.table.fetchAutocomplete).toHaveBeenCalled();
            expect(data[0]).toBe("bar");
        });

        describe("provides a way to sort the table", function() {
            it ("defaults the sort to ascending if the previous sort does not match the new sort.", function() {
                var expectedParams = {sort_by: 'name', sort_order: 'ASC', search: '', page: 1};
                nutupane.table.resource.sort = {};

                spyOn(Resource, 'queryPaged');
                nutupane.table.sortBy({id: "name"});

                expect(Resource.queryPaged).toHaveBeenCalledWith(expectedParams, jasmine.any(Function));
            });

            it("toggles the sort order if already sorting by that column", function() {
                var expectedParams = {sort_by: 'name', sort_order: 'DESC', search: '', page: 1};
                nutupane.table.resource.sort = {
                    by: 'name',
                    order: 'ASC'
                };

                spyOn(Resource, 'queryPaged');
                nutupane.table.sortBy({id: "name"});

                expect(Resource.queryPaged).toHaveBeenCalledWith(expectedParams, jasmine.any(Function));
            });

            it("sets the column sort order and marks it as active.", function() {
                var column = {id: "name"}
                nutupane.table.resource.sort = {};
                nutupane.table.sortBy(column);
                expect(column.sortOrder).toBe("ASC");
                expect(column.active).toBe(true);
            });

            it("refreshes the table by calling query()", function() {
                spyOn(nutupane, "query");
                nutupane.table.sortBy({id: "name"});
                expect(nutupane.query).toHaveBeenCalled();
            });

            describe("watches $locationChangeStart", function () {
                beforeEach(function () {
                    nutupane.table.closeItem = function() {};
                    spyOn(nutupane.table, 'closeItem');
                });

                it("and closes the item pane if the url matches the org switcher url", function () {
                    $rootScope.$emit("$locationChangeStart", '/organizations/1-Default%20Organization/select');
                    expect(nutupane.table.closeItem).toHaveBeenCalled();
                });

                it("and does nothing if the URL does not match the org switcher url", function () {
                    $rootScope.$emit("$locationChangeStart", '/some-other-url/select');
                    expect(nutupane.table.closeItem).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe("Nutupane should", function() {
        beforeEach(function() {
            nutupane = new Nutupane(Resource, {}, 'customAction');
            nutupane.table.working = false;
            nutupane.table.closeItem = function () {};
            nutupane.table.allSelected = function () {};
            nutupane.table.selectAll = function () {};
        });

        it("provide a method to fetch records for the table via a custom action", function() {
            spyOn(Resource, 'customAction');
            nutupane.query();

            expect(Resource.customAction).toHaveBeenCalled();
        });

        it("naming the URL search field based off the action", function() {
            spyOn(Resource, 'customAction');
            nutupane.table.search('*');

            expect($location.search()['customActionSearch']).toBe('*');
        });

        it("provide a method to add params", function () {
            nutupane.addParam('test', 'ABC');

            expect(nutupane.getParams()['test']).toBe('ABC');
        });
    });

});

