# ts-validation
A validation library that makes use of the proposed es7 decorators to configure validation on a model level for our classes.

It allows multiple validation on the same property as well as custom messages to be set.

It will stop at the first validation of the property.

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
