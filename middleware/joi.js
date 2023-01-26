const joi=require('joi');

const registerschema=(data)=>{
    const schema=joi.object({
        name:joi.string().min(3).required(),
        username:joi.string().min(4).required(),
        email:joi.string().min(4).required().email(),
        password:joi.string().min(4).required(),

    })
    return schema.validate(data);
}
const loginschema=(data)=>{
    const schema=joi.object({
        email:joi.string().min(4).required().email(),
        password:joi.string().min(4).required(),

    })
    return schema.validate(data);
}
module.exports.registerschema=registerschema;
module.exports.loginschema=loginschema;