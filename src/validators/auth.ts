import Joi from 'joi';

export const registerRequestValidator = Joi.object({
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%]).+$'))
        .min(8)
        .max(255)
        .required(),
    passwordConfirmation: Joi.ref('password'),
})
    .with('password', 'passwordConfirmation');