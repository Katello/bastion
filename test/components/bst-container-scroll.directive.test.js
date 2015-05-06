describe('Directive: bstContainerScroll', function() {
    var scope,
        compile,
        window,
        tableElement;

    beforeEach(module('Bastion.components'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$window_) {
        compile = _$compile_;
        scope = _$rootScope_;
        window = _$window_;
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
        var table = tableElement.find('table'),
            windowElement = angular.element(window);

        windowElement.height('100px');
        windowElement.trigger('resize');

        expect(tableElement.height()).toEqual(windowElement.height() - tableElement.offset().top);
    });
});
