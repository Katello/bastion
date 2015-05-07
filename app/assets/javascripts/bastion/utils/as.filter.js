/**
 * @ngdoc filter
 * @name Bastion.utils.filter:as
 *
 * @requires $parse
 *
 * @description
 *   Adds variable to scope with the value passed in. This allows adding to the
 *   scope a variable that contains the result of multiple applied filters.
 *
 * @example
 *   <ul>
       <li ng-repeat="item in items | filter:customFilter | as:filteredItems"></li>
     </ul>
 */
angular.module('Bastion.utils').filter('as', ['$parse', function ($parse) {
    return function (value, path) {
        return $parse(path).assign(this, value);
    };
}]);
