describe('Filter:arrayToString', function() {
    var array, arrayToStringFilter;

    beforeEach(module('Bastion.components.formatters'));

    beforeEach(inject(function($filter) {
        array = [
            {id: 1, name: 'one'},
            {id: 2, name: 'two'},
            {id: 3, name: 'three'}
        ];
        arrayToStringFilter = $filter('arrayToString');
    }));

    it("transforms an array to a string.", function() {
        expect(arrayToStringFilter(array, "id")).toBe('1, 2, 3');
    });

    it("defaults item to pluck to 'name' if not provided.", function() {
        expect(arrayToStringFilter(array)).toBe('one, two, three');
    });

    it("allows a custom separator", function() {
        expect(arrayToStringFilter(array, "id", ':')).toBe('1:2:3');
    });
});
