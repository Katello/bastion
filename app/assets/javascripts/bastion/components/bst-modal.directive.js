/**
 * @ngdoc directive
 * @name Bastion.components.directive:bstModal
 * @restrict A
 *
 * @requires $templateCache
 * @requires $modal
 *
 * @description
 *   Provides a wrapper around angular-ui's modal dialog service.
 */
angular.module('Bastion.components').directive('bstModal',
    ['$templateCache', '$modal', function ($templateCache, $modal) {
    return {
        transclude: true,
        scope: {
            action: '&bstModal',
            modelName: '@model',
            model: '='
        },
        link: function (scope, iElement, iAttrs, nullCtrl, transclude) {
            var modalInstance, modalController, modalId;

            modalId = 'bstModal%d.html'.replace('%d', Math.random().toString());

            modalController = ['$scope', '$modalInstance', 'model', function ($scope, $modalInstance, model) {
                $scope[scope.modelName] = model;

                $scope.ok = function () {
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }];

            scope.openModal = function () {
                modalInstance = $modal.open({
                    templateUrl: modalId,
                    controller: modalController,
                    resolve: {
                        model: function () {
                            return scope[scope.modelName];
                        }
                    }
                });

                modalInstance.result.then(function () {
                    scope.action();
                });
            };

            scope.$parent.openModal = scope.openModal;

            transclude(function (clone) {
                var template = angular.element('<div extend-template="components/views/bst-modal.html"></div>');
                template.append(clone);
                $templateCache.put(modalId, template);
            });
        }
    };
}]);
