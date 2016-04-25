describe('Directive: bstContainerScroll', function() {
    var scope,
        compile,
        windowElement,
        tableElement;

    beforeEach(module('Bastion.components'));

    beforeEach(inject(function(_$compile_, _$rootScope_, $window) {
        compile = _$compile_;
        scope = _$rootScope_;
        windowElement = angular.element($window)
    }));

    beforeEach(function() {
        tableElement = angular.element(
            '<div bst-container-scroll>' +
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
    });

    it("should adjust the table height on window resize", function() {
        windowElement.height('100px');
        windowElement.trigger('resize');

        expect(tableElement.height()).toEqual(windowElement.height() - tableElement.offset().top);
    });

    it("should ensure that the element is at least 200px", function () {
        windowElement.height('200px');
        tableElement.css('padding-bottom', '200px');

        compile(tableElement)(scope);
        scope.$digest();

        windowElement.trigger('resize');
        expect(tableElement.height()).toEqual(300);
    });

    it("should add the nutupane details padding if it exists", function () {
        tableElement.css('padding-bottom', '10px');

        compile(tableElement)(scope);
        scope.$digest();

        windowElement.height('100px');
        windowElement.trigger('resize');

        expect(tableElement.height()).toEqual(windowElement.height() - (tableElement.offset().top + 10));
    });
});
