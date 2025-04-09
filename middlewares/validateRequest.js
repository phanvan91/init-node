const {validationResult, checkSchema} = require('express-validator');

class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.status = 422;
    this.errors = errors;
  }
}


module.exports = (RequestClass) => {
  return [
    checkSchema(
      convertRulesToSchema(
        RequestClass.rules(),
        typeof RequestClass.messages === 'function' ? RequestClass.messages() : {}
      )
    ),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ValidationError('The given data was invalid.', errors.mapped()));
      }
      next();
    },
  ];
};

function convertRulesToSchema(rules, messages = {}) {
  const schema = {};
  for (const field in rules) {
    const ruleStr = rules[field];
    const ruleList = ruleStr.split('|');

    schema[field] = {
      in: ['body'],
      ...(ruleList.includes('required') && {
        exists: {errorMessage: messages[`${field}.required`] || `${field} is required`},
      }),
      ...(ruleList.includes('string') && {
        isString: {errorMessage: messages[`${field}.string`] || `${field} must be a string`},
      }),
      ...(ruleList.includes('email') && {
        isEmail: {errorMessage: messages[`${field}.email`] || `${field} must be an email`},
      }),
      ...(ruleList.includes('numeric') && {
        isNumeric: {errorMessage: messages[`${field}.numeric`] || `${field} must be numeric`},
      }),
    };

    const minRule = ruleList.find((r) => r.startsWith('min:'));
    if (minRule) {
      const min = parseInt(minRule.split(':')[1], 10);
      schema[field].isInt = {
        options: {min},
        errorMessage: messages[`${field}.min`] || `${field} minimum is ${min}`,
      };
    }
  }
  return schema;
}
