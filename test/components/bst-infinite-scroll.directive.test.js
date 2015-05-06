describe('Directive: bstInfiniteScroll', function () {
    var $scope, $compile, $q, element;

    beforeEach(module('Bastion.components'));

    beforeEach(inject(function ($rootScope, _$compile_, _$q_){
        $scope = $rootScope;
        $compile = _$compile_;
        $q = _$q_;

        $scope.scrollHandler = {
            doIt: function() {
                var deferred = $q.defer();
                element.append('<p style="height: 10px;"></p>');
                deferred.resolve({});
                return deferred.promise;
            }
        };
        $scope.data = [];
        element = angular.element('<div data="data" bst-infinite-scroll="scrollHandler.doIt()" style=" height: 100px; position: absolute; overflow-y: auto;"></div>');
        $('body').append(element);
    }));

    describe("loads more results if scrolling near the bottom", function() {
        beforeEach(function() {
            $compile(element)($scope);
            $scope.$digest();
        });

        it("calls the provided scroll function when scrolling near the bottom.", function() {
            spyOn($scope.scrollHandler, "doIt");

            // 95% of the height of the scroll area
            element.scrollTop(element[0].scrollHeight *.95);
            element.trigger('scroll');

            expect($scope.scrollHandler.doIt).toHaveBeenCalled();
        });

        it("does not calls the provided scroll function when not scrolling near the bottom.", function() {
            spyOn($scope.scrollHandler, "doIt");

            // 10% of the height of the scroll area
            element.scrollTop(element[0].scrollHeight *.10);
            element.trigger('scroll');

            expect($scope.scrollHandler.doIt).not.toHaveBeenCalled();
        });
    });

    describe("loads more results if there is not a scrollbar", function() {
        it("on initial load.", function() {
            spyOn($scope.scrollHandler, "doIt").andCallThrough();
            $compile(element)($scope);
            $scope.$digest();
            expect($scope.scrollHandler.doIt.callCount).toBe(10);
        });
    });

    describe("does not load more results if there is already a scrollbar", function() {
        beforeEach(function() {
            $compile(element)($scope);
            $scope.$digest();
        });

        it("on initial load.", function() {
            spyOn($scope.scrollHandler, "doIt").andCallThrough();
            $scope.$digest();
            expect($scope.scrollHandler.doIt.callCount).toBe(0);
        });
    });

    describe("loads more results based on the height of the elements", function() {
        beforeEach(function() {
            element.empty();
            element.append('<p style="height: 10px;"></p>');
        });

        it("loads more results if the scroll height is less than element height.", function() {
            spyOn($scope.scrollHandler, "doIt").andCallThrough();
            element.height("9px");

            $compile(element)($scope);
            $scope.$digest();

            expect($scope.scrollHandler.doIt.callCount).toBe(1);
        });

        it("does not load more results if the scroll height is equal to the element height.", function() {
            element.height("10px");

            $compile(element)($scope);

            spyOn($scope.scrollHandler, "doIt");
            $scope.$digest();

            expect($scope.scrollHandler.doIt.callCount).toBe(0);
        });

        it("does not load more results if the scroll height is greater than the element height.", function() {
            element.height("11px");
            element.append('<p style="height: 10px;"></p>');
            $compile(element)($scope);

            spyOn($scope.scrollHandler, "doIt");
            $scope.$digest();

            expect($scope.scrollHandler.doIt.callCount).toBe(0);
        });
    });
});
