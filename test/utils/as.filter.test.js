describe('Filter:as', function() {
    var array, scope = {};

    beforeEach(module('Bastion.utils'));

    beforeEach(inject(function($filter) {
        array = [
            {id: 1, name: 'one'},
            {id: 2, name: 'two'},
            {id: 3, name: 'three'}
        ];
        scope.asFilter = $filter('as')
    }));

    it("should set items to the value of array", function() {
        expect(scope.asFilter(array, 'items')).toEqual(array);
        expect(scope.items).toEqual(array);
    });

});
