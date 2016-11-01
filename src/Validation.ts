const ValidatorTag: string = 'Validators'

export function Custom(fun: { (target: any, propertyKey: string): boolean }, errorMessage: string) {
    return function (target: any, propertyKey: string) {
        if (target[ValidatorTag] == null)
            target[ValidatorTag] = new Object()

        if (target[ValidatorTag][propertyKey] == null)
            target[ValidatorTag][propertyKey] = new Array<any>()

        target[ValidatorTag][propertyKey].push((value, propertyKey) => {
            let result: boolean = fun(value, propertyKey)
            if (result)
                return null
            else
                return errorMessage
        })
    }
}

export function RegEx(regEx: RegExp, errorMessage: string = null) {
    return function (target: any, propertyKey: string) {
        let message: string = `${propertyKey} is not valid`
        if (errorMessage != null)
            message = errorMessage

        if (target[ValidatorTag] == null)
            target[ValidatorTag] = new Object()

        if (target[ValidatorTag][propertyKey] == null)
            target[ValidatorTag][propertyKey] = new Array<any>()

        target[ValidatorTag][propertyKey].push((value, propertyKey) => {
            let re = regEx
            if (re.test(value))
                return null
            else
                return message
        })
    }
}

export function Email(errorMessage: string = null) {
    return function (target: any, propertyKey: string) {
        let message: string = `${propertyKey} is not a valid email address`
        if (errorMessage != null)
            message = errorMessage

        if (target[ValidatorTag] == null)
            target[ValidatorTag] = new Object()

        if (target[ValidatorTag][propertyKey] == null)
            target[ValidatorTag][propertyKey] = new Array<any>()

        target[ValidatorTag][propertyKey].push((value, propertyKey) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (re.test(value))
                return null
            else
                return message
        })
    }
}

export function Required(errorMessage: string = null) {
    return function (target: any, propertyKey: string) {
        let message: string = `You must provide a value for ${propertyKey}`
        if (errorMessage != null)
            message = errorMessage

        if (target[ValidatorTag] == null)
            target[ValidatorTag] = new Object()

        if (target[ValidatorTag][propertyKey] == null)
            target[ValidatorTag][propertyKey] = new Array<any>()

        target[ValidatorTag][propertyKey].push((value, propertyKey) => {
            if ((value == null) || (value == ''))
                return message
            else
                return null
        })
    }
}

export class ValidationError {
    constructor(public field: string, public message: string) {

    }
}

export class Validator {
    public static Validate(target: any): Array<ValidationError> {
        let errors = new Array<ValidationError>()

        let validator = target[ValidatorTag]
        if (validator != null) {
            for (let property in validator) {
                let propertyValidators = validator[property]
                for (let i = 0; i < propertyValidators.length; i++) {
                    let validatorResult = propertyValidators[i](target[property], property)
                    if (validatorResult != null) {
                        errors.push(new ValidationError(property, validatorResult))
                        break
                    }
                }
            }
        }

        return errors
    }
}