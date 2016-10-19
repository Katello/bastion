/**
 * @ngdoc directive
 * @name Bastion.components.directive:bstModal
 * @restrict A
 *
 * @requires $templateCache
 * @requires $uibModal
 *
 * @description
 *   Provides a wrapper around angular-ui's modal dialog service.
 */
angular.module('Bastion.components').directive('bstModal',
    ['$templateCache', '$uibModal', function ($templateCache, $uibModal) {
    return {
        scope: {
            action: '&bstModal',
            modelName: '@model',
            model: '='
        },
        compile: function(tElement) {
            var template = angular.element('<div extend-template="components/views/bst-modal.html"></div>'), modalId;

            template.append(tElement.children());
            tElement.html('');
            tElement = angular.element(template);

            modalId = 'bstModal%d.html'.replace('%d', Math.random().toString());
            $templateCache.put(modalId, tElement);

            return function (scope) {
                var modalInstance, modalController;

                modalController = ['$scope', '$uibModalInstance', 'model', function ($scope, $uibModalInstance, model) {
                    $scope[scope.modelName] = model;

                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }];

                scope.openModal = function () {
                    modalInstance = $uibModal.open({
                        templateUrl: modalId,
                        controller: modalController,
                        resolve: {
                            model: function () {
                                return scope.model;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        scope.action();
                    });
                };

                scope.$parent.openModal = scope.openModal;
            };
        }
    };
}]);
