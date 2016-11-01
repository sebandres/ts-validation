import * as Validation from '../src/Validation'

class User {
    @Validation.Email()
    @Validation.Required()
    email: string
    name: string
}

class UserWithCustomMessage {
    @Validation.Email('You must provide a valid email!')
    @Validation.Required('The email field cannot be empty')
    email: string
    name: string
}

class UserWithRegularExpression {
    @Validation.RegEx(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    @Validation.Required()
    email: string
    name: string
}

function CustomValidation(value: string, propertyKey: string): boolean {
    let valid: boolean = false;
    if (value.substr(0, 3) == 'Seb')
        valid = true
    return valid
}

class UserWithCustomValidation {
    email: string
    @Validation.Custom(CustomValidation, 'Value of Name does not start with "Seb"!')
    name: string
}

describe('Validation for Required Property', () => {
    it('Should return an error item when object is not passed in', () => {
        let user = new User()

        let errors = Validation.Validator.Validate(user)
        expect(errors.length).toBe(1);
    });
});

describe('Validation for Email', () => {
    it('Should return an error item when object is not a proper email', () => {
        let user = new User()
        user.email = 'wrongemail.com'

        let errors = Validation.Validator.Validate(user)
        expect(errors.length).toBe(1)
        expect(errors[0].message).toBe('email is not a valid email address')
    });
});

describe('Validation for Email with Custom Message', () => {
    it('Should return a custom error message item when object is not a proper email', () => {
        let user = new UserWithCustomMessage()

        let errors = Validation.Validator.Validate(user)
        expect(errors.length).toBe(1)
        expect(errors[0].message).toBe('The email field cannot be empty')
    });
});

describe('Validation for Email with Custom RegEx', () => {
    it('Should return an error message item when object is not a proper email', () => {
        let user = new UserWithCustomMessage()

        let errors = Validation.Validator.Validate(user)
        expect(errors.length).toBe(1)
        expect(errors[0].message).toBe('The email field cannot be empty')
    });
});

describe('Validation for Name with Custom Logic', () => {
    it('Should return an error message item when name does not start with "Seb"', () => {
        let user = new UserWithCustomValidation()
        user.name = 'Carlos'

        let errors = Validation.Validator.Validate(user)
        expect(errors.length).toBe(1)
        expect(errors[0].message).toBe('Value of Name does not start with "Seb"!')
    });
});

describe('Validation for Name with Custom Logic', () => {
    it('Should NOT return an error message item when name starts with "Seb"', () => {
        let user = new UserWithCustomValidation()
        user.name = 'Sebastian'

        let errors = Validation.Validator.Validate(user)
        expect(errors.length).toBe(0)
    });
});
