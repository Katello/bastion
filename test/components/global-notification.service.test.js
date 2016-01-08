describe('Factory: GlobalNofification', function() {
    beforeEach(module('Bastion.components'));

    beforeEach(inject(function (_GlobalNotification_) {
        GlobalNotification = _GlobalNotification_;
    }));

   it("provides a way to set error messages", function () {
        errorMessage = "Everything is broken!";
        GlobalNotification.setErrorMessage(errorMessage);
        expect(GlobalNotification.errorMessages.length).toBe(1);
        expect(GlobalNotification.errorMessages[0]).toBe(errorMessage);
    });

    it("provides a way to set success messages", function () {
        successMessage = "Everything ran correctly!";
        GlobalNotification.setSuccessMessage(successMessage);
        expect(GlobalNotification.successMessages.length).toBe(1);
        expect(GlobalNotification.successMessages[0]).toBe(successMessage);
    });

    it("provides a way to set rendered error messages", function () {
        errorMessage = "Everything is broken!";
        GlobalNotification.setRenderedErrorMessage(errorMessage);
        expect(GlobalNotification.errorMessages.length).toBe(1);
        expect(GlobalNotification.errorMessages[0]['message']).toBe(errorMessage);
    });

    it("provides a way to set rendered success messages", function () {
        successMessage = "Everything ran correctly!";
        GlobalNotification.setRenderedSuccessMessage(successMessage);
        expect(GlobalNotification.successMessages.length).toBe(1);
        expect(GlobalNotification.successMessages[0]['message']).toBe(successMessage);
    })
});
