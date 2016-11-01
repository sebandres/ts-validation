"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Validation = require('../src/Validation');
var User = (function () {
    function User() {
    }
    __decorate([
        Validation.Email(),
        Validation.Required()
    ], User.prototype, "email", void 0);
    return User;
}());
var UserWithCustomMessage = (function () {
    function UserWithCustomMessage() {
    }
    __decorate([
        Validation.Email('You must provide a valid email!'),
        Validation.Required('The email field cannot be empty')
    ], UserWithCustomMessage.prototype, "email", void 0);
    return UserWithCustomMessage;
}());
describe('Validation for Required Property', function () {
    it('Should return an error item when object is not passed in', function () {
        var user = new User();
        var errors = Validation.Validator.Validate(user);
        expect(errors.length).toBe(1);
    });
});
describe('Validation for Email', function () {
    it('Should return an error item when object is not a proper email', function () {
        var user = new User();
        user.email = 'wrongemail.com';
        var errors = Validation.Validator.Validate(user);
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('email is not a valid email address');
    });
});
describe('Validation for Email with Custom Message', function () {
    it('Should return a custom error message item when object is not a proper email', function () {
        var user = new UserWithCustomMessage();
        var errors = Validation.Validator.Validate(user);
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('The email field cannot be empty');
    });
});
//# sourceMappingURL=validation-tests.js.map