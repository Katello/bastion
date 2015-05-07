/**
 * @ngdoc filter
 * @name  Bastion.components.formatters.filter:arrayToString
 *
 * @description
 *
 *
 * @example
 *
 */
angular.module('Bastion.components.formatters').filter('arrayToString', [function () {
    return function (toFormat, stringToPluck, separator) {
        stringToPluck = stringToPluck || 'name';
        separator = separator || ', ';
        return _.pluck(toFormat, stringToPluck).join(separator);
    };
}]);
