describe('Directive: nutupaneTable', function() {
    var scope,
        compile,
        tableElement;

    beforeEach(module('Bastion.components'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        compile = _$compile_;
        scope = _$rootScope_;
    }));

    beforeEach(function() {
        tableElement = angular.element(
            '<div nutupane-table>' +
              '<table>' +
                '<thead>' +
                  '<tr><th>Column 1</th></tr>' +
                '</thead>' +
                '<tbody>' +
                  '<tr>' +
                    '<td>Row 1</td>' +
                 '</tr>' +
                '</tbody>' +
              '</table>' +
            '</div>');

        compile(tableElement)(scope);
        scope.$digest();
        scope.$broadcast("$stateChangeSuccess", {}, {}, {}, {});
    });

    it("should create a new table element with just the thead", function() {
        var theads = tableElement.find('thead'),
            tbodys = tableElement.find('tbody');

        expect(theads.length).toEqual(2);
        expect(tbodys.length).toEqual(1);
    });

    it("should hide the original table's thead", function() {
        var originalTableHead = angular.element(tableElement.find('thead')[1]);

        expect(originalTableHead.css('display')).toBe('none');
    });

    it("should remove the duplicate row select from the cloned table if present", function() {
        var rowSelectTable = tableElement.clone();
        rowSelectTable.find('thead').prepend("<tr><th class='row-select'></th></tr>");
        compile(rowSelectTable)(scope);
        scope.$digest();
        scope.$broadcast("$stateChangeSuccess", {}, {}, {}, {});
        expect(rowSelectTable.find('.row-select').length).toBe(1);
    });
});
