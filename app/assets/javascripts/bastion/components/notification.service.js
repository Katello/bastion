/**
 * @ngdoc service
 * @name  Bastion.components.service:Notification
 *
 * @description
 *  Service to display a foreman toast notification
 */
angular.module('Bastion.components').service("Notification", ['$interpolate', 'foreman', function ($interpolate, foreman) {
    function interpolateIfNeeded(message, context) {
        var result = message;

        if (context) {
            result = $interpolate(message)(context);
        }

        return result;
    }

    this.setSuccessMessage = function (message, context) {
        foreman.toastNotifications.notify({message: interpolateIfNeeded(message, context), type: 'success'});
    };

    this.setWarningMessage = function (message, context) {
        foreman.toastNotifications.notify({message: interpolateIfNeeded(message, context), type: 'warning'});
    };

    this.setErrorMessage = function (message, context) {
        foreman.toastNotifications.notify({message: interpolateIfNeeded(message, context), type: 'danger'});
    };
}]);
