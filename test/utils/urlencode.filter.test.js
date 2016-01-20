describe('Filter:urlencode', function() {
    beforeEach(module('Bastion.utils'));

    beforeEach(inject(function($filter) {
        urlencodeFilter = $filter('urlencode')
    }));

    it("should encode a url", function() {
        expect(urlencodeFilter('=')).toEqual('%3D');
    });
});
