import Joi from 'joi';

const userSchema = Joi.object({
  firstName: Joi.string().min(4).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
    'string.pattern.base':
      '"password" must be alphanumeric and between 3 and 30 characters long',
  }),
});

export default userSchema;
