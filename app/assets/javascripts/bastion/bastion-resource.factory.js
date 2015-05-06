/**
 * @ngdoc factory
 * @name  Bastion.factory:BastionResource
 *
 * @requires BastionResource
 *
 * @description
 *   Base module that defines the Katello module namespace and includes any thirdparty
 *   modules used by the application.
 */
angular.module('Bastion').factory('BastionResource', ['$resource', function ($resource) {

    return function (url, paramDefaults, actions) {
        var defaultActions;

        defaultActions = {
            queryPaged: {method: 'GET', isArray: false},
            queryUnpaged: {method: 'GET', isArray: false, params: {'full_result': true}}
        };

        actions = angular.extend({}, defaultActions, actions);

        return $resource(url, paramDefaults, actions);
    };

}]);
