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
var UserWithRegularExpression = (function () {
    function UserWithRegularExpression() {
    }
    __decorate([
        Validation.RegEx(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validation.Required()
    ], UserWithRegularExpression.prototype, "email", void 0);
    return UserWithRegularExpression;
}());
function CustomValidation(value, propertyKey) {
    var valid = false;
    if (value.substr(0, 3) == 'Seb')
        valid = true;
    return valid;
}
var UserWithCustomValidation = (function () {
    function UserWithCustomValidation() {
    }
    __decorate([
        Validation.Custom(CustomValidation, 'Value of Name does not start with "Seb"!')
    ], UserWithCustomValidation.prototype, "name", void 0);
    return UserWithCustomValidation;
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
describe('Validation for Email with Custom RegEx', function () {
    it('Should return an error message item when object is not a proper email', function () {
        var user = new UserWithCustomMessage();
        var errors = Validation.Validator.Validate(user);
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('The email field cannot be empty');
    });
});
describe('Validation for Name with Custom Logic', function () {
    it('Should return an error message item when name does not start with "Seb"', function () {
        var user = new UserWithCustomValidation();
        user.name = 'Carlos';
        var errors = Validation.Validator.Validate(user);
        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe('Value of Name does not start with "Seb"!');
    });
});
describe('Validation for Name with Custom Logic', function () {
    it('Should NOT return an error message item when name starts with "Seb"', function () {
        var user = new UserWithCustomValidation();
        user.name = 'Sebastian';
        var errors = Validation.Validator.Validate(user);
        expect(errors.length).toBe(0);
    });
});
//# sourceMappingURL=validation-tests.js.map