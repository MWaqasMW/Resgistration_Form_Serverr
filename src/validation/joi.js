import joi from "joi"


export const registerValidation =  joi.object({
    name: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    // phone: joi.string().regex(/^[0-9]{10}$/).required(),
    // number: joi.number().integer().min(0).required(),
   
        
})



export const StudentRegisterValidation =  joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    course: joi.string().required(),

})


export const attendenceValidation = joi.object({
    name: joi.string().min(3).required(),
    course: joi.string().required(),
    isPresent : joi.boolean().required()
})