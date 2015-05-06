angular.module('Bastion').value('currentLocale', 'Here');
angular.module('Bastion').value('CurrentOrganization', "ACME");
angular.module('Bastion').value('CurrentUser', {id: "User"});
angular.module('Bastion').value('Permissions', []);
angular.module('Bastion').value('Authorization', {});
angular.module('Bastion').value('markActiveMenu', function () {});
angular.module('Bastion').constant('BastionConfig', {
    consumerCertRPM: "consumer_cert_rpm",
    markTranslated: false
});

angular.module('templates', []);

angular.module('Bastion').config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
});

