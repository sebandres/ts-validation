# ts-validation
A validation library that makes use of the proposed es7 decorators to configure validation on a model level for our classes.

It allows multiple validation on the same property as well as custom messages to be set.

It will stop at the first validation of the property. On the example below if now value is provided then the default message for the required property is returned. If there is a value on the property then it will be tested for a valid format.

## Usage 
```
import * as Validation from '../src/Validation'

class User {
    @Validation.Email('You must provide a valid email!')
    @Validation.Required()
    email: string
    name: string
}

let user = new User()
let errors = Validation.Validator.Validate(user)
```
