/**
 * @ngdoc service
 * @name  Bastion.components.service:GlobalNotification
 *
 * @description
 *  Service to display a global notifcation
 */
angular.module('Bastion.components').service("GlobalNotification", function () {
    this.errorMessages = [];
    this.successMessages = [];

    this.setSuccessMessage = function (message) {
        this.successMessages.push(message);
    };

    this.setErrorMessage = function (message) {
        this.errorMessages.push(message);
    };

    this.setRenderedSuccessMessage = function (message) {
        var messageObj = { "message": message, "render": true };
        this.successMessages.push(messageObj);
    };

    this.setRenderedErrorMessage = function (message) {
        var messageObj = { "message": message, "render": true };
        this.errorMessages.push(messageObj);
    };
});
