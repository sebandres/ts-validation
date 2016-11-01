"use strict";
var ValidatorTag = 'Validators';
function Email(errorMessage) {
    if (errorMessage === void 0) { errorMessage = null; }
    return function (target, propertyKey) {
        var message = propertyKey + " is not a valid email address";
        if (errorMessage != null)
            message = errorMessage;
        if (target[ValidatorTag] == null)
            target[ValidatorTag] = new Object();
        if (target[ValidatorTag][propertyKey] == null)
            target[ValidatorTag][propertyKey] = new Array();
        target[ValidatorTag][propertyKey].push(function (value, propertyKey) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(value))
                return null;
            else
                return message;
        });
    };
}
exports.Email = Email;
function Required(errorMessage) {
    if (errorMessage === void 0) { errorMessage = null; }
    return function (target, propertyKey) {
        var message = "You must provide a value for " + propertyKey;
        if (errorMessage != null)
            message = errorMessage;
        if (target[ValidatorTag] == null)
            target[ValidatorTag] = new Object();
        if (target[ValidatorTag][propertyKey] == null)
            target[ValidatorTag][propertyKey] = new Array();
        target[ValidatorTag][propertyKey].push(function (value, propertyKey) {
            if ((value == null) || (value == ''))
                return message;
            else
                return null;
        });
    };
}
exports.Required = Required;
var ValidationError = (function () {
    function ValidationError(field, message) {
        this.field = field;
        this.message = message;
    }
    return ValidationError;
}());
exports.ValidationError = ValidationError;
var Validator = (function () {
    function Validator() {
    }
    Validator.Validate = function (target) {
        var errors = new Array();
        var validator = target[ValidatorTag];
        if (validator != null) {
            for (var property in validator) {
                var propertyValidators = validator[property];
                for (var i = 0; i < propertyValidators.length; i++) {
                    var validatorResult = propertyValidators[i](target[property], property);
                    if (validatorResult != null) {
                        errors.push(new ValidationError(property, validatorResult));
                        break;
                    }
                }
            }
        }
        return errors;
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=Validation.js.map