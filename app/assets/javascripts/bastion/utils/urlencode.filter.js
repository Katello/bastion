/**
 * @ngdoc filter
 * @name Bastion.utils.filter:urlencode
 *
 * @requires $window
 *
 * @description
 *   Encode a url
 */
angular.module('Bastion.utils').filter('urlencode', function ($window) {
    return $window.encodeURIComponent;
});
