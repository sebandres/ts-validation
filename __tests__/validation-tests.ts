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
		expect(errors.length).toBe(1);
		expect(errors[0].message).toBe('email is not a valid email address');
	});
});

describe('Validation for Email with Custom Message', () => {
	it('Should return a custom error message item when object is not a proper email', () => {
		let user = new UserWithCustomMessage()

		let errors = Validation.Validator.Validate(user)
		expect(errors.length).toBe(1);
		expect(errors[0].message).toBe('The email field cannot be empty');
	});
});